import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import CodeEditor from "../../Rooms/CodeEditor";
import Layout from "../../Layout1/Layout";
import { Box, Text, Button, Code, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import axios from "axios";

const CustomRoom = () => {
  const { publicRoomId, privateRoomId } = useParams();
  const { roomId } = useParams();
  const location = useLocation();
  const { question = {} } = location.state || {};

  const isReadOnly = location.state?.isReadOnly || false;
  const fromNavbar = location.state?.fromNavbar || false;
  const hideRoomId = location.state?.hideRoomId;

  const [output, setOutput] = useState("");
  const [languageId, setLanguageId] = useState(63); // Default to JavaScript
  const [initialCode, setInitialCode] = useState(`console.log("Hello, World!");`);
  const [isMobile, setIsMobile] = useState(false);  // Mobile check state
  const [isEditorOpen, setIsEditorOpen] = useState(false); // Track if editor modal is open

  const editorRef = useRef(null);

  // Debounced resize event handler to prevent rapid layout recalculations
  useEffect(() => {
    const handleResize = debounce(() => {
      if (window.innerWidth <= 768) {
        setIsMobile(true); // Mobile
      } else {
        setIsMobile(false); // Desktop or tablet
      }
    }, 200); // Debounce delay of 200ms

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Add event listener
    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on unmount
    };
  }, []);

  // Debounce function to limit resize event calls
  function debounce(func, wait) {
    let timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, arguments), wait);
    };
  }

  useEffect(() => {
    const fetchDefaultCode = async () => {
      const title = question?.title || publicRoomId?.replace(/-/g, " ");
      if (!title) return;

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_TESTCASE_API}/default/${title}`
        );
        const defaultCode = res.data.defaultCode;

        window.defaultQuestionCode = {
          ...window.defaultQuestionCode,
          [title.toLowerCase()]: {
            javascript: defaultCode,
          },
        };

        setInitialCode(defaultCode); // set the code locally too
      } catch (err) {
        console.error("Failed to fetch default code:", err);
      }
    };

    fetchDefaultCode();
  }, [question?.title, publicRoomId]);

  const handleRunCode = async () => {
    let code = editorRef.current?.getValue();
    const title = question?.title || publicRoomId?.replace(/-/g, " ");

    if (!code || !title) {
      setOutput("Editor is empty or no question loaded.");
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_CODE_SUBMIT}`, {
        code,
        language: languageId,
        title,
      },{
        withCredentials: true,
      });

      // Format test results output
      const results = res.data.testResults;

      if (results && Array.isArray(results)) {
        const formattedOutput = results.map((result, idx) => {
          return (
            `Test Case ${idx + 1}:\n` +
            `Input: ${result.input}\n` +
            `Expected: ${result.expectedOutput}\n` +
            `Actual: ${result.actualOutput}\n` 
            
          );
        }).join("\n-------------------\n");

        setOutput(formattedOutput);
      } else {
        setOutput("No test results received.");
      }
    } catch (err) {
      console.error("Error submitting code:", err);
      setOutput("Error submitting code to backend.");
    }
  };

  return (
    <Layout>
      <Box width="100%" textAlign="center" mt={6}>
        {publicRoomId ? (
          <Text fontSize="lg" fontWeight="semibold" color="white">
            Public Room ID: {publicRoomId || "N/A"}
            {!hideRoomId && <> || Private Room ID: {privateRoomId || "N/A"}</>}
          </Text>
        ) : roomId ? (
          <Text fontSize="lg" fontWeight="semibold" color="white">
            Room ID: {roomId}
          </Text>
        ) : null}
      </Box>
      {!isReadOnly && !fromNavbar && (
        <>
          {/* Modal for Code Editor */}
          <Modal isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)}>
            <ModalOverlay />
            <ModalContent marginTop="50px">
              <ModalHeader>Code Editor</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box maxHeight="400px" overflowY="auto">
                  <CodeEditor
                    editorRef={editorRef}
                    languageId={languageId}
                    setLanguageId={setLanguageId}
                    initialCode={initialCode}
                    height="100%"  // Keep default height
                  />
                </Box>
                <Button
                  colorScheme="red"
                  mt={4}
                  onClick={() => setIsEditorOpen(false)}
                  width="100%"
                >
                  Close Editor
                </Button>
              </ModalBody>
            </ModalContent>
          </Modal>
          <Box
            marginTop={{ base: "50px", md: "10px" }}
            width="100%"
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            gap={4}
          >
            {/* Left side - Question Details */}
            <Box
              width="40%"
              pr={4}
              overflowY="auto"
              maxHeight={{ base: "auto", md: "90vh" }}
              order={{ base: 2, md: 1 }}
            >
              {/* Question details */}
              <Text fontSize={{ base: "md", md: "2xl" }} fontWeight="bold" mb={{ base: 2, md: 4 }}>
                {question.title || "Custom Room"} - {publicRoomId}
              </Text>
              <Text fontSize={{ base: "sm", md: "md" }} mb={{ base: 1, md: 2 }}>
                <strong>Difficulty:</strong> {question.difficulty}
              </Text>
              <Text fontSize={{ base: "sm", md: "md" }} mb={{ base: 1, md: 2 }}>
                <strong>Statement:</strong> {question.statement}
              </Text>
              <Text fontSize={{ base: "sm", md: "md" }} mb={{ base: 1, md: 2 }}>
                <strong>Sample Input:</strong> {question.sampleInput}
              </Text>
              <Text fontSize={{ base: "sm", md: "md" }} mb={{ base: 1, md: 2 }}>
                <strong>Sample Output:</strong> {question.sampleOutput}
              </Text>
              <Text fontSize={{ base: "sm", md: "md" }} mb={{ base: 1, md: 2 }}>
                <strong>Constraints:</strong> {question.constraints}
              </Text>
            </Box>

            {/* Buttons and Output */}
            <Box
              flex={{ base: "none", md: "0.5" }}
              display="flex"
              flexDirection="column"
              alignItems={{ base: "center", md: "flex-start" }}
              order={{ base: 3, md: 2 }}
              mb={{ base: 4, md: 0 }}
            >
              <Box mt={4}>
                <Text fontWeight="bold">Select Language:</Text>
                <select value={languageId} onChange={(e) => setLanguageId(Number(e.target.value))}>
                  <option value={63}>JavaScript</option>
                  <option value={62}>Java</option>
                  <option value={52}>C++</option>
                  <option value={71}>Python</option>
                </select>
              </Box>
              <Button mt={4} colorScheme="blue" onClick={handleRunCode}>
                Run Code
              </Button>
              <Box mt={4} width="100%">
                  <Text fontWeight="bold">Output:</Text>
                  <Box overflowX="auto" maxHeight="150px">
                      <Code whiteSpace="pre-wrap">{output}</Code>
                  </Box>
              </Box>
            </Box>

            {/* CodeEditor on larger screens */}
            {!isMobile && (
              <Box
                width="60%"
                marginLeft="150px"
                display="flex"
                flexDirection="column"
                gap={5}
                order={{ base: 3, md: 3 }}
              >
                <div style={{ width: "100%", minWidth: "300px" }}>
                  <CodeEditor
                    editorRef={editorRef}
                    languageId={languageId}
                    setLanguageId={setLanguageId}
                    initialCode={initialCode}
                  />
                </div>
              </Box>
            )}

            {/* Button to open the Code Editor modal on mobile */}
            {isMobile && (
              <Box display="flex" flexDirection="column" alignItems="center">
                <Button onClick={() => setIsEditorOpen(true)}>Open Code Editor</Button>
              </Box>
            )}
          </Box>
        </>
      )}
    </Layout>
  );
};

export default CustomRoom;
