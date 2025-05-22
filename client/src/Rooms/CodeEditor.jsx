import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, HStack, VStack, Button, Text, Flex } from "@chakra-ui/react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { CODE_SNIPPETS } from "../constants";
import socket from "../sockets/socket";

const getLanguageName = (id) => { switch (id) { case 63: return "javascript"; case 71: return "python"; default: return "javascript"; } };

const CodeEditor = ({ editorRef, languageId, setLanguageId, defaultLanguageId = 63 }) => {
  const monaco = useMonaco();
  const { publicRoomId, privateRoomId } = useParams();
  const [value, setValue] = useState(() => { const lang = getLanguageName(defaultLanguageId); const questionTitle = publicRoomId?.replace(/-/g, " "); if (questionTitle && window.defaultQuestionCode?.[questionTitle.toLowerCase()]) { return window.defaultQuestionCode[questionTitle.toLowerCase()][lang] || CODE_SNIPPETS[lang]; } return CODE_SNIPPETS[lang]; });
  const [theme, setTheme] = useState("vs-dark");
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    if (!monaco) return;

    monaco.editor.defineTheme('professional-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '94B4C1', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'ECEFCA', fontStyle: 'bold' },
        { token: 'string', foreground: '94B4C1' },
        { token: 'number', foreground: 'ECEFCA' },
      ],
      colors: {
        'editor.background': '#213448',
        'editor.foreground': '#ECEFCA',
        'editor.lineHighlightBackground': '#547792',
        'editor.selectionBackground': '#547792',
        'editorCursor.foreground': '#ECEFCA',
        'editorLineNumber.foreground': '#94B4C1',
        'editorLineNumber.activeForeground': '#ECEFCA',
        'editor.selectionHighlightBackground': '#547792',
        'editorIndentGuide.background': '#547792',
        'editorWhitespace.foreground': '#547792',
      }
    });

    monaco.editor.defineTheme('professional-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '547792', fontStyle: 'italic' },
        { token: 'keyword', foreground: '213448', fontStyle: 'bold' },
        { token: 'string', foreground: '547792' },
        { token: 'number', foreground: '213448' },
      ],
      colors: {
        'editor.background': '#ECEFCA',
        'editor.foreground': '#213448',
        'editor.lineHighlightBackground': '#94B4C1',
        'editor.selectionBackground': '#94B4C1',
        'editorCursor.foreground': '#213448',
        'editorLineNumber.foreground': '#547792',
        'editorLineNumber.activeForeground': '#213448',
        'editor.selectionHighlightBackground': '#94B4C1',
        'editorIndentGuide.background': '#94B4C1',
        'editorWhitespace.foreground': '#94B4C1',
      }
    });

    monaco.editor.setTheme(theme === 'vs-dark' ? 'professional-dark' : 'professional-light');
  }, [monaco, theme]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  useEffect(() => {
    if (!privateRoomId) return;
    if (!socket.connected) {
      socket.connect();
      socket.on("connect", () => { setSocketConnected(true); console.log("🔌 Connected to socket server"); socket.emit("join-room", privateRoomId); console.log("🔗 Joined room:", privateRoomId); });
    }
    const handleIncomingCode = (incomingCode) => { const currentCode = editorRef.current?.getValue(); if (incomingCode !== currentCode) { editorRef.current?.setValue(incomingCode); } };
    socket.on("code-change", handleIncomingCode);
    return () => { socket.off("code-change", handleIncomingCode); socket.disconnect(); console.log("🧹 Disconnected from socket server"); };
  }, [privateRoomId]);

  const handleCodeChange = (val) => { setValue(val); if (privateRoomId && socketConnected) { socket.emit("code-change", { privateRoomId, code: val }); } };

  useEffect(() => {
    const lang = getLanguageName(languageId);
    const questionTitle = publicRoomId?.replace(/-/g, " ");
    if (questionTitle && window.defaultQuestionCode?.[questionTitle.toLowerCase()]) { setValue(window.defaultQuestionCode[questionTitle.toLowerCase()][lang] || CODE_SNIPPETS[lang]); } else { setValue(CODE_SNIPPETS[lang]); }
  }, [languageId]);

  useEffect(() => {
    const fetchDefaultCode = async () => {
      const title = publicRoomId?.replace(/-/g, " "); const lang = getLanguageName(languageId); if (!title) return;
      try { const res = await fetch(`${process.env.REACT_APP_TESTCASE_API}/default/${title}`); const data = await res.json(); const defaultCode = data?.defaultCode; if (defaultCode) { setValue(defaultCode); } } catch (err) { console.error("Failed to load default code from backend", err); }
    };
    fetchDefaultCode();
  }, [publicRoomId]);

  return (
    <VStack spacing={0} width={{ base: "80%", md: "60%" }} height="75vh">
      {/* Professional Header */}
      <Flex width="100%" bg="#213448" px={6} py={3} borderTopRadius="lg" justify="space-between" align="center" borderBottom="2px solid #547792">
        <HStack spacing={4}>
          <Box width={3} height={3} borderRadius="full" bg="#ECEFCA" />
          <Box width={3} height={3} borderRadius="full" bg="#94B4C1" />
          <Box width={3} height={3} borderRadius="full" bg="#547792" />
          <Text color="#ECEFCA" fontSize="sm" fontWeight="semibold" ml={4}>
            {getLanguageName(languageId).toUpperCase()} Editor
          </Text>
        </HStack>
        <HStack spacing={3}>
          {socketConnected && <Box width={2} height={2} borderRadius="full" bg="#ECEFCA" />}
          <Button size="xs" bg="#547792" color="#ECEFCA" _hover={{ bg: "#94B4C1", color: "#213448" }} onClick={() => { 
            const newTheme = theme === "vs-dark" ? "light" : "vs-dark"; 
            setTheme(newTheme); 
            if (editorRef.current && monaco) {
              monaco.editor.setTheme(newTheme === 'vs-dark' ? 'professional-dark' : 'professional-light');
            }
          }} borderRadius="md" px={3}>
            {theme === "vs-dark" ? "Light" : "Dark"}
          </Button>
        </HStack>
      </Flex>

      {/* Editor Container */}
      <Box width="100%" height="100%" bg="#213448" borderBottomRadius="lg" border="2px solid #547792" borderTop="none" position="relative" overflow="hidden">
        <Box position="absolute" top={0} left={0} right={0} bottom={0} border="1px solid #94B4C1" borderRadius="0 0 lg lg" overflow="hidden">
          <Editor
            height="100%"
            theme={theme === 'vs-dark' ? 'professional-dark' : 'professional-light'}
            language={getLanguageName(languageId)}
            value={value}
            onMount={onMount}
            onChange={handleCodeChange}
            options={{
              fontSize: 16,
              fontFamily: 'Fira Code, Consolas, Monaco, monospace',
              lineHeight: 1.5,
              minimap: { enabled: false },
              wordWrap: "on",
              scrollBeyondLastLine: false,
              renderWhitespace: "none",
              cursorBlinking: "smooth",
              padding: { top: 16, bottom: 16 },
              scrollbar: { vertical: 'auto', horizontal: 'auto', verticalScrollbarSize: 8, horizontalScrollbarSize: 8 },
              bracketPairColorization: { enabled: true },
              smoothScrolling: true,
              cursorSmoothCaretAnimation: true,
              renderLineHighlight: 'gutter',
              lineNumbers: 'on',
              glyphMargin: false,
              folding: true,
              lineDecorationsWidth: 10,
              lineNumbersMinChars: 3,
              automaticLayout: true
            }}
          />
        </Box>
        
        {/* Professional Bottom Status Bar */}
        <Box position="absolute" bottom={0} left={0} right={0} bg="#213448" borderTop="1px solid #547792" px={4} py={2}>
          <HStack justify="space-between" fontSize="xs" color="#94B4C1">
            <HStack spacing={4}>
              <Text>Line {value.split('\n').length}</Text>
              <Text>Chars {value.length}</Text>
              <Text>{getLanguageName(languageId)}</Text>
            </HStack>
            <HStack spacing={2}>
              {privateRoomId && (
                <HStack spacing={1}>
                  <Box width={1.5} height={1.5} borderRadius="full" bg={socketConnected ? "#ECEFCA" : "#547792"} />
                  <Text color={socketConnected ? "#ECEFCA" : "#94B4C1"}>
                    {socketConnected ? "Connected" : "Disconnected"}
                  </Text>
                </HStack>
              )}
            </HStack>
          </HStack>
        </Box>
      </Box>
    </VStack>
  );
};

export default CodeEditor;