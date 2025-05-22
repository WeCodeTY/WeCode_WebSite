import React, { useEffect, useRef, useState } from "react";
import Video from "twilio-video";
import { Box, Text, Button, Badge, Avatar, Flex, IconButton, Tooltip } from "@chakra-ui/react";
import { MdVideocam, MdVideocamOff, MdMic, MdMicOff, MdPeople, MdSignalWifi4Bar, MdSettings, MdFullscreen } from "react-icons/md";
import axios from "axios";
import socket from "../sockets/socket";
import { useNavigate } from "react-router-dom";

const VideoConferencing = ({ roomId, identity }) => {
  console.log("VideoConferencing component rendered with roomId:", roomId);
  const localVideoRef = useRef(null);
  const [room, setRoom] = useState(null);
  const [remoteParticipants, setRemoteParticipants] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [connectionQuality, setConnectionQuality] = useState("good");
  const [callDuration, setCallDuration] = useState(0);
  const navigate = useNavigate();

  // Timer for call duration
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleVideo = () => {
    if (!room) return;

    room.localParticipant.videoTracks.forEach(publication => {
      const track = publication.track;

      if (isVideoEnabled) {
        track.disable();
        if (localVideoRef.current) {
          localVideoRef.current.innerHTML = "";
        }
      } else {
        track.enable();
        if (localVideoRef.current) {
          localVideoRef.current.innerHTML = "";
          const videoElement = track.attach();
          videoElement.style.width = "100%";
          videoElement.style.height = "100%";
          videoElement.style.objectFit = "contain";
          localVideoRef.current.appendChild(videoElement);
        }
      }
    });

    setIsVideoEnabled(prev => !prev);
  };

  const handleToggleAudio = () => {
    if (!room) return;
    room.localParticipant.audioTracks.forEach(publication => {
      const track = publication.track;
      if (isAudioEnabled) {
        track.disable();
      } else {
        track.enable();
      }
    });
    setIsAudioEnabled(prev => !prev);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_ALL_USERS, { withCredentials: true });
        console.log("Fetched users:", res.data);
        const map = {};
        res.data.users.forEach(user => {
          map[user.id] = user.username;
        });
        setUserMap(map);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!roomId || !identity) return;
    if (!localVideoRef.current) return;

    const joinRoom = async () => {
      try {
        console.log("Attempting to join Twilio room:", roomId, "with identity:", identity);
        console.log("Connecting to Twilio with identity:", identity, "and roomId:", roomId);
        const res = await axios.get(process.env.REACT_APP_VIDEO_TOKEN, {
          params: { identity, room: roomId },
        });
        const token = res.data.token;
        console.log("Received token from backend");

        const room = await Video.connect(token, { name: roomId, audio: true, video: true });
        console.log("Connected to Twilio room:", room.sid);
        setRoom(room);

        const localTracks = await Video.createLocalTracks();
        localTracks.forEach((track) => {
          if (localVideoRef.current) {
            const videoElement = track.attach();
            videoElement.style.width = "100%";
            videoElement.style.height = "100%";
            videoElement.style.objectFit = "contain";
            localVideoRef.current.appendChild(videoElement);
          }
        });

        setRemoteParticipants(Array.from(room.participants.values()));
        console.log("Initial remote participants:", room.participants.size);

        const handleParticipantConnected = (participant) => {
          console.log("Participant connected:", participant.identity);
          setRemoteParticipants((prev) => [...prev, participant]);
        };
        room.on("participantConnected", handleParticipantConnected);

        const handleParticipantDisconnected = (participant) => {
          console.log("Participant disconnected:", participant.identity);
          setRemoteParticipants((prev) => prev.filter((p) => p.sid !== participant.sid));
        };
        room.on("participantDisconnected", handleParticipantDisconnected);

        room.on("disconnected", () => {
          console.log("Disconnected from room");
          localTracks.forEach((track) => {
            track.stop();
            track.detach().forEach((el) => el.remove());
          });
          setRoom(null);
          setRemoteParticipants([]);
        });
      } catch (error) {
        console.error("Could not connect to Twilio:", error);
      }
    };

    joinRoom();

    return () => {
      if (room) {
        room.disconnect();
      }
    };
  }, [roomId, identity, localVideoRef]);

  useEffect(() => {
    socket.emit("join-room", roomId);

    socket.on("roomEnded", ({ identity: endedBy }) => {
      if (endedBy === identity) {
        console.log("📞 You ended the room, disconnecting.");
        if (room) {
          room.disconnect();
          setRoom(null);
          setRemoteParticipants([]);

          room.localParticipant.tracks.forEach(publication => {
            const track = publication.track;
            if (track) {
              track.stop();
              track.detach().forEach(el => el.remove());
            }
          });
        }
        alert("You have left the call.");
        navigate("/dsaDashboard");
      }
    });

    return () => {
      socket.off("roomEnded");
    };
  }, [roomId, room, navigate]);

  return (
    <Box display="flex" flexDir="column" gap={3} p={5} maxW="900px" overflow="auto" bg="#213448" borderRadius="xl" boxShadow="xl" pos="relative">
      {/* Header with call info */}
      <Flex justify="space-between" align="center" bg="#547792" p={3} borderRadius="lg">
        <Flex align="center" gap={3}>
          <Box w={3} h={3} bg="#ECEFCA" borderRadius="full" animation="pulse 2s infinite" />
          <Text color="#ECEFCA" fontWeight="bold" fontSize="sm">
            LIVE • {formatDuration(callDuration)}
          </Text>
          <Badge bg="#94B4C1" color="#213448" borderRadius="full">
            <Flex align="center" gap={1}>
              <MdPeople size={12} />
              {remoteParticipants.length + 1}
            </Flex>
          </Badge>
        </Flex>
        
        <Flex gap={2}>
          <Tooltip label="Connection Quality">
            <Badge border="1px solid #ECEFCA" color="#ECEFCA" bg="transparent">
              <Flex align="center" gap={1}>
                <MdSignalWifi4Bar size={14} />
                Good
              </Flex>
            </Badge>
          </Tooltip>
          <Tooltip label="Settings">
            <IconButton 
              size="sm" 
              variant="ghost" 
              color="#ECEFCA"
              _hover={{ bg: "#94B4C1" }}
              icon={<MdSettings />} 
            />
          </Tooltip>
        </Flex>
      </Flex>

      {/* Video Grid */}
      <Flex gap={4} wrap="wrap" justify="center">
        <Box 
          flex="1" 
          maxW="360px" 
          minW="300px"
          bg="#547792" 
          borderRadius="xl" 
          overflow="hidden"
          boxShadow="lg"
          border="2px solid #94B4C1"
          pos="relative"
        >
          {/* Video Header */}
          <Flex 
            justify="space-between" 
            align="center" 
            p={3}
            bg="blackAlpha.600"
            backdropFilter="blur(5px)"
          >
            <Flex align="center" gap={2}>
              <Avatar size="xs" name={identity} bg="blue.500" />
              <Text color="white" fontSize="sm" fontWeight="medium">
                You
              </Text>
            </Flex>
            <Tooltip label="Fullscreen">
              <IconButton 
                size="xs" 
                variant="ghost" 
                color="white"
                _hover={{ bg: "whiteAlpha.200" }}
                icon={<MdFullscreen />} 
              />
            </Tooltip>
          </Flex>
          
          {/* Video Content */}
          <Box ref={localVideoRef} width="100%" height="200px" bg="gray.900" />
          
          {/* Control Panel */}
          <Box p={4} bg="#213448" borderTop="1px solid #94B4C1">
            <Flex justify="center" gap={4}>
              <Tooltip label={isVideoEnabled ? "Turn off camera" : "Turn on camera"}>
                <Button
                  size="1rem"
                  w="40px"
                  h="40px"
                  p={2}
                  borderRadius="full"
                  bg={isVideoEnabled ? "#94B4C1" : "red.500"}
                  color="#213448"
                  onClick={handleToggleVideo}
                  _hover={{ transform: "scale(1.05)" }}
                >
                  <Flex direction="column" align="center" justify="center" w="100%" h="100%">
                    {isVideoEnabled ? <MdVideocam size="100%" /> : <MdVideocamOff size="100%" />}
                  </Flex>
                </Button>
              </Tooltip>

              <Tooltip label={isAudioEnabled ? "Mute microphone" : "Unmute microphone"}>
                <Button
                  size="lg"
                  variant="solid"
                  bg={isAudioEnabled ? "#94B4C1" : "red.500"}
                  color="#213448"
                  borderRadius="full"
                  w="40px"
                  h="40px"
                  onClick={handleToggleAudio}
                  _hover={{ transform: "scale(1.05)" }}
                >
                  <Flex direction="column" align="center" justify="center" w="100%" h="100%">
                    {isAudioEnabled ? <MdMic size="100%" /> : <MdMicOff size="100%" />}
                  </Flex>
                </Button>
              </Tooltip>
            </Flex>
          </Box>
        </Box>
        
        {remoteParticipants.map((participant) => (
          <RemoteParticipant key={participant.sid} participant={participant} userMap={userMap} identity={identity} />
        ))}
      </Flex>
    </Box>
  );
};

export default VideoConferencing;

const RemoteParticipant = ({ participant, userMap }) => {
  const ref = useRef();

  useEffect(() => {
    participant.tracks.forEach(publication => {
      if (publication.isSubscribed && publication.track) {
        const videoElement = publication.track.attach();
        videoElement.style.width = "100%";
        videoElement.style.height = "100%";
        videoElement.style.objectFit = "contain";
        ref.current.appendChild(videoElement);
      }
    });

    const trackSubscribed = (track) => {
      const videoElement = track.attach();
      videoElement.style.width = "100%";
      videoElement.style.height = "100%";
      videoElement.style.objectFit = "contain";
      ref.current.appendChild(videoElement);
    };

    participant.on("trackSubscribed", trackSubscribed);

    return () => {
      participant.removeAllListeners();
      if (ref.current) ref.current.innerHTML = "";
    };
  }, [participant]);

  return (
    <Box 
      width="220px" 
      height="180px" 
      bg="#547792" 
      borderRadius="xl" 
      overflow="hidden"
      boxShadow="md"
      border="2px solid #94B4C1"
      pos="relative"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "xl"
      }}
      transition="all 0.2s ease"
    >
      <Flex 
        justify="space-between" 
        align="center" 
        p={2}
        bg="blackAlpha.600"
        backdropFilter="blur(5px)"
        position="absolute"
        top={0}
        left={0}
        right={0}
        zIndex={1}
      >
        <Flex align="center" gap={2}>
          <Avatar size="xs" name={userMap[participant.identity] || participant.identity} bg="purple.500" />
          <Text 
            color="white" 
            fontSize="sm" 
            fontWeight="medium"
            maxW="120px"
            isTruncated
          >
            {userMap[participant.identity] || participant.identity}
          </Text>
        </Flex>
        <Box 
          w={2} 
          h={2} 
          bg="green.400" 
          borderRadius="full"
          animation="pulse 2s infinite"
        />
      </Flex>
      <Box ref={ref} width="100%" height="100%" />
    </Box>
  );
};