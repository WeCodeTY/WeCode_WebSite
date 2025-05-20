import React, { useEffect, useRef, useState } from "react";
import Video from "twilio-video";
import { Box, Text } from "@chakra-ui/react";
import axios from "axios";
import socket from "../sockets/socket";
import { useNavigate } from "react-router-dom";

const VideoConferencing = ({ roomId, identity }) => {
  const localVideoRef = useRef(null);
  const [room, setRoom] = useState(null);
  const [remoteParticipants, setRemoteParticipants] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const navigate = useNavigate();

  const handleToggleVideo = () => {
    if (!room) return;
    room.localParticipant.videoTracks.forEach(publication => {
      const track = publication.track;
      if (isVideoEnabled) {
        track.disable();
      } else {
        track.enable();
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
    if (!roomId) return;

    const joinRoom = async () => {
      try {
        console.log("Joining room:", roomId, "with identity:", identity);
        const res = await axios.get( process.env.REACT_APP_VIDEO_TOKEN, {
          params: { identity, room: roomId },
        });
        const token = res.data.token;
        console.log("Received token from backend");

        const room = await Video.connect(token, { name: roomId, audio: true, video: true });
        console.log("Connected to Twilio room:", room.sid);
        setRoom(room);

        const localTracks = await Video.createLocalTracks();
        localTracks.forEach((track) => {
          const videoElement = track.attach();
          videoElement.style.width = "100%";
          videoElement.style.height = "100%";
          videoElement.style.objectFit = "contain";
          localVideoRef.current.appendChild(videoElement);
        });

        // Add existing participants on join
        setRemoteParticipants(Array.from(room.participants.values()));
        console.log("Initial remote participants:", room.participants.size);

        // Listen for future participants joining
        const handleParticipantConnected = (participant) => {
          console.log("Participant connected:", participant.identity);
          setRemoteParticipants((prev) => [...prev, participant]);
        };
        room.on("participantConnected", handleParticipantConnected);

        // Remove participants on disconnect
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
  }, [roomId, identity]);

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
    <Box display="flex" gap={2} p={2} maxWidth="650px" overflow="auto">
      <Box flex="1" maxWidth="320px" maxHeight="240px" bg="black" borderRadius="md" overflow="hidden">
        <Text color="white" textAlign="center" mb={1}>Your Video</Text>
        <Box ref={localVideoRef} width="100%" height="180px" />
        <Box mt={1} display="flex" justifyContent="center" gap={2}>
          <button onClick={handleToggleVideo} style={{ fontSize: "12px", padding: "2px 6px" }}>
            {isVideoEnabled ? "Turn Off Video" : "Turn On Video"}
          </button>
          <button onClick={handleToggleAudio} style={{ fontSize: "12px", padding: "2px 6px" }}>
            {isAudioEnabled ? "Mute" : "Unmute"}
          </button>
        </Box>
      </Box>
      {remoteParticipants.map((participant) => (
        <RemoteParticipant key={participant.sid} participant={participant} userMap={userMap} identity={identity} />
      ))}
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
    <Box width="160px" height="120px" bg="black" borderRadius="md" overflow="hidden">
      <Text color="white" fontSize="sm" textAlign="center" mb={1}>{userMap[participant.identity] || participant.identity}</Text>
      <Box ref={ref} width="100%" height="90px" />
    </Box>
  );
}