import socket from "../../sockets/socket";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import CodeEditor from "../../Rooms/CodeEditor";
import VideoConferencing from "../../Rooms/VideoConferencing";
import Layout from "../../Layout1/Layout";
import { Box, Text, Button, Code, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, VStack, HStack, Divider, Badge, Container, Flex, Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import axios from "axios";

const CustomRoom = () => {
  const { publicRoomId, privateRoomId, roomId } = useParams();
  const location = useLocation();
  const { question = {} } = location.state || {};
  const navigate = useNavigate();
  
  console.log("CustomRoom rendered with room IDs:", { publicRoomId, privateRoomId, roomId });

  const isReadOnly = location.state?.isReadOnly || false;
  const fromNavbar = location.state?.fromNavbar || false;
  const hideRoomId = location.state?.hideRoomId;
  const hideVideoTitle = location.state?.hideVideoTitle || false;

  const [output, setOutput] = useState("");
  const [languageId, setLanguageId] = useState(63);
  const [initialCode, setInitialCode] = useState(`console.log("Hello, World!");`);
  const [isMobile, setIsMobile] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const editorRef = useRef(null);
  const videoRoomRef = useRef(null);

  useEffect(() => {
    const handleResize = debounce(() => setIsMobile(window.innerWidth <= 768), 200);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function debounce(func, wait) {
    let timeout;
    return function () { clearTimeout(timeout); timeout = setTimeout(() => func.apply(this, arguments), wait); };
  }

  useEffect(() => {
    const fetchDefaultCode = async () => {
      const title = question?.title || publicRoomId?.replace(/-/g, " ");
      if (!title) return;
      try {
        const res = await axios.get(`${process.env.REACT_APP_TESTCASE_API}/default/${title}`);
        const defaultCode = res.data.defaultCode;
        window.defaultQuestionCode = { ...window.defaultQuestionCode, [title.toLowerCase()]: { javascript: defaultCode } };
        setInitialCode(defaultCode);
      } catch (err) { console.error("Failed to fetch default code:", err); }
    };
    fetchDefaultCode();
  }, [question?.title, publicRoomId]);

  const handleRunCode = async () => {
    let code = editorRef.current?.getValue();
    const title = question?.title || publicRoomId?.replace(/-/g, " ");
    if (!code || !title) { setOutput("Editor is empty or no question loaded."); return; }
    try {
      const res = await axios.post(`${process.env.REACT_APP_CODE_SUBMIT}`, { code, language: languageId, title }, { withCredentials: true });
      const results = res.data.testResults;
      if (results && Array.isArray(results)) {
        const formattedOutput = results.map((result, idx) => `Test Case ${idx + 1}:\nInput: ${result.input}\nExpected: ${result.expectedOutput}\nActual: ${result.actualOutput}\n`).join("\n-------------------\n");
        setOutput(formattedOutput);
      } else { setOutput("No test results received."); }
    } catch (err) {
      console.error("Error submitting code:", err);
      setOutput("Error submitting code to backend.");
    }
  };

  const handleEndCall = async () => {
    console.log("handleEndCall called");
    const currentRoomId = publicRoomId || roomId;
    const identity = localStorage.getItem("userId") || "guest";
    if (videoRoomRef.current && videoRoomRef.current.disconnectRoom) {
      console.log("Disconnecting local video room");
      videoRoomRef.current.disconnectRoom();
    }
    console.log("Emitting roomEnded event for room:", currentRoomId, "identity:", identity);
    socket.emit("roomEnded", { roomId: currentRoomId, identity });
    console.log("Calling backend API to end room");
    try {
      console.log("Posting to backend to end room with ID:", currentRoomId);
      await axios.post(`${process.env.REACT_APP_CALL_ENDPOINT}`, { roomId: currentRoomId }, { withCredentials: true });
      navigate("/dsaDashboard");
    } catch (error) {
      navigate("/dsaDashboard");
      console.error("Failed to end room:", error.message || error);
    }
  };

  useEffect(() => {
    console.log("Listening for roomEnded event");
    socket.on("roomEnded", () => {
      console.log("Received roomEnded event");
      if (videoRoomRef.current && videoRoomRef.current.disconnectRoom) {
        console.log("Disconnecting video room due to roomEnded event");
        videoRoomRef.current.disconnectRoom();
      }
      alert("The host has ended the call.");
      navigate("/dsaDashboard");
    });
    console.log("Setup complete for roomEnded listener");
    return () => {
      console.log("Cleaning up roomEnded listener");
      socket.off("roomEnded");
    };
  }, []);

  const difficultyColor = question.difficulty === "Easy" ? "#94B4C1" : question.difficulty === "Medium" ? "#547792" : "#213448";

  return (
    <Layout>
      <Box bg="#213448" minH="100vh" color="#ECEFCA">
        <Container maxW="100%" p={0}>
          {/* Header */}
          <Box bg="#213448" borderBottom="2px solid #547792" px={6} py={4}>
            <Flex justify="space-between" align="center">
              <Box />
              <VStack spacing={1}>
                <Text fontSize="xl" fontWeight="bold" color="#ECEFCA">
                  {(!publicRoomId && !privateRoomId) && roomId && `Room: ${roomId}`}
                </Text>
                <Text fontSize="sm" color="#94B4C1">Active Coding Session</Text>
              </VStack>
              <Button onClick={handleEndCall} size="lg" bg="#547792" color="#ECEFCA" _hover={{ bg: "#94B4C1", color: "#213448" }} leftIcon={<span>📞</span>} borderRadius="lg" fontWeight="bold">
                End Room
              </Button>
            </Flex>
          </Box>

          {!isReadOnly && !fromNavbar && (
            <>
              {/* Mobile Editor Modal */}
              <Modal isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)} size="full">
                <ModalOverlay bg="rgba(33, 52, 72, 0.8)" />
                <ModalContent bg="#213448" color="#ECEFCA" m={2} borderRadius="xl">
                  <ModalHeader bg="#547792" borderTopRadius="xl" color="#ECEFCA">Code Editor</ModalHeader>
                  <ModalCloseButton color="#ECEFCA" />
                  <ModalBody p={4}>
                    <Box maxHeight="70vh" overflowY="auto">
                      <CodeEditor editorRef={editorRef} languageId={languageId} setLanguageId={setLanguageId} initialCode={initialCode} height="100%" />
                    </Box>
                    <Button colorScheme="red" mt={4} onClick={() => setIsEditorOpen(false)} width="100%" bg="#547792" _hover={{ bg: "#94B4C1", color: "#213448" }}>Close Editor</Button>
                  </ModalBody>
                </ModalContent>
              </Modal>

              {/* Main Content */}
              <Flex direction={{ base: "column", lg: "row" }} gap={6} p={6}>
                {/* Left Panel - Question Details */}
                <Box flex="0 0 40%" order={{ base: 2, lg: 1 }}>
                  <Card bg="#547792" borderRadius="xl" shadow="xl" border="1px solid #94B4C1">
                    <CardHeader bg="#213448" borderTopRadius="xl" py={4}>
                      <HStack justify="space-between" align="center">
                        <Heading size="lg" color="#ECEFCA">{question.title || "Custom Room"}</Heading>
                        <Badge bg={difficultyColor} color="#ECEFCA" px={3} py={1} borderRadius="full" fontSize="sm" fontWeight="bold">{question.difficulty}</Badge>
                      </HStack>
                      <Text fontSize="sm" color="#94B4C1" mt={1}>Room ID: {publicRoomId}</Text>
                    </CardHeader>
                    <CardBody color="#ECEFCA" p={6}>
                      <VStack align="stretch" spacing={4}>
                        <Box>
                          <Text fontWeight="bold" color="#ECEFCA" mb={2}>Problem Statement</Text>
                          <Text fontSize="sm" color="#94B4C1" lineHeight="1.6">{question.statement}</Text>
                        </Box>
                        <Divider borderColor="#94B4C1" />
                        <HStack spacing={6}>
                          <Box flex="1">
                            <Text fontWeight="bold" color="#ECEFCA" mb={2}>Sample Input</Text>
                            <Code bg="#213448" color="#94B4C1" p={2} borderRadius="md" fontSize="sm" width="100%" whiteSpace="pre-wrap">{question.sampleInput}</Code>
                          </Box>
                          <Box flex="1">
                            <Text fontWeight="bold" color="#ECEFCA" mb={2}>Sample Output</Text>
                            <Code bg="#213448" color="#94B4C1" p={2} borderRadius="md" fontSize="sm" width="100%" whiteSpace="pre-wrap">{question.sampleOutput}</Code>
                          </Box>
                        </HStack>
                        <Box>
                          <Text fontWeight="bold" color="#ECEFCA" mb={2}>Constraints</Text>
                          <Text fontSize="sm" color="#94B4C1">{question.constraints}</Text>
                        </Box>
                      </VStack>
                    </CardBody>
                  </Card>

                  {!hideVideoTitle && (
                    <Card bg="#547792" borderRadius="xl" shadow="xl" border="1px solid #94B4C1" mt={6}>
                      <CardHeader bg="#213448" borderTopRadius="xl" py={3}>
                        <Heading size="md" color="#ECEFCA">Video Conference</Heading>
                      </CardHeader>
                      <CardBody p={4}>
                        <VideoConferencing ref={videoRoomRef} roomId={publicRoomId || privateRoomId || roomId} identity={localStorage.getItem("userId") || "guest"} />
                      </CardBody>
                    </Card>
                  )}
                </Box>

                {/* Right Panel - Code Editor & Controls */}
                <Box flex="1" order={{ base: 1, lg: 2 }}>
                  <VStack spacing={6} align="stretch">
                    {/* Controls Panel */}
                    <Card bg="#547792" borderRadius="xl" shadow="xl" border="1px solid #94B4C1">
                      <CardBody p={4}>
                        <HStack justify="space-between" wrap="wrap" spacing={4}>
                          <HStack spacing={3}>
                            <Text fontWeight="bold" color="#ECEFCA">Language:</Text>
                            <select value={languageId} onChange={(e) => setLanguageId(Number(e.target.value))} style={{ background: "#213448", color: "#ECEFCA", padding: "8px 12px", borderRadius: "8px", border: "1px solid #94B4C1" }}>
                              <option value={63}>JavaScript</option>
                              
                              <option value={71}>Python</option>
                            </select>
                          </HStack>
                          <HStack spacing={3}>
                            {isMobile && <Button onClick={() => setIsEditorOpen(true)} bg="#94B4C1" color="#213448" _hover={{ bg: "#ECEFCA" }} borderRadius="lg" fontWeight="bold">Open Editor</Button>}
                            <Button onClick={handleRunCode} bg="#94B4C1" color="#213448" _hover={{ bg: "#ECEFCA" }} borderRadius="lg" fontWeight="bold" leftIcon={<span>▶️</span>}>Run Code</Button>
                          </HStack>
                        </HStack>
                      </CardBody>
                    </Card>

                    {/* Code Editor - Desktop */}
                    {!isMobile && (
                      <Card bg="#213448" borderRadius="xl" shadow="xl" border="1px solid #94B4C1" minH="500px">
                        <CardHeader bg="#547792" borderTopRadius="xl" py={3}>
                          <Heading size="md" color="#ECEFCA">Code Editor</Heading>
                        </CardHeader>
                        <CardBody p={0}>
                          <Box borderBottomRadius="xl" overflow="hidden">
                            <CodeEditor editorRef={editorRef} languageId={languageId} setLanguageId={setLanguageId} initialCode={initialCode} />
                          </Box>
                        </CardBody>
                      </Card>
                    )}

                    {/* Output Panel */}
                    <Card bg="#547792" borderRadius="xl" shadow="xl" border="1px solid #94B4C1">
                      <CardHeader bg="#213448" borderTopRadius="xl" py={3}>
                        <Heading size="md" color="#ECEFCA">Test Results</Heading>
                      </CardHeader>
                      <CardBody p={4}>
                        <Box bg="#213448" borderRadius="lg" p={4} minH="120px" maxH="300px" overflowY="auto">
                          <Code whiteSpace="pre-wrap" bg="transparent" color="#94B4C1" fontSize="sm" width="100%">
                            {output || "Click 'Run Code' to see test results..."}
                          </Code>
                        </Box>
                      </CardBody>
                    </Card>
                  </VStack>
                </Box>
              </Flex>
            </>
          )}

          {fromNavbar && (
            <Box p={6}>
              <Card bg="#547792" borderRadius="xl" shadow="xl" border="1px solid #94B4C1">
                <CardHeader bg="#213448" borderTopRadius="xl" py={4}>
                  <Heading size="lg" color="#ECEFCA">Video Conference</Heading>
                </CardHeader>
                <CardBody p={6}>
                  <VideoConferencing ref={videoRoomRef} roomId={publicRoomId || privateRoomId || roomId} identity={localStorage.getItem("userId") || "guest"} />
                </CardBody>
              </Card>
            </Box>
          )}
        </Container>
      </Box>
    </Layout>
  );
};

export default CustomRoom;