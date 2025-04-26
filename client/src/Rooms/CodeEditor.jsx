import * as monaco from "monaco-editor";
import React, { useState, useRef, useEffect } from "react";
import { debounce } from "lodash";
import { useParams } from "react-router-dom";
import { Box, HStack } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import { io } from "socket.io-client";

// Global socket instance (only created once)
const socket = io(process.env.REACT_APP_SOCKET_URL, {
  withCredentials: true,
  autoConnect: false, // Connect manually
});

const getLanguageName = (id) => {
  switch (id) {
    case 63:
      return "javascript";
    case 71:
      return "python";
    default:
      return "javascript";
  }
};

const CodeEditor = ({ editorRef, languageId, setLanguageId, defaultLanguageId = 63 }) => {
  const { publicRoomId, privateRoomId } = useParams();
  const [value, setValue] = useState(() => {
    const lang = getLanguageName(defaultLanguageId);
    const questionTitle = publicRoomId?.replace(/-/g, " ");
    if (questionTitle && window.defaultQuestionCode?.[questionTitle.toLowerCase()]) {
      return window.defaultQuestionCode[questionTitle.toLowerCase()][lang] || CODE_SNIPPETS[lang];
    }
    return CODE_SNIPPETS[lang];
  });
  const [theme, setTheme] = useState("vs-dark");

  // Language selector
  const onSelect = (selectedLang) => {
    setLanguageId(selectedLang === "javascript" ? 63 : 71);
    setValue(CODE_SNIPPETS[selectedLang]);
  };

  // When Monaco mounts
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const [socketConnected, setSocketConnected] = useState(false);

  const debouncedEmitCode = debounce((socket, privateRoomId, code) => {
    if (privateRoomId && socket.connected) {
      socket.emit("code-change", { privateRoomId, code });
    }
  }, 300);

  useEffect(() => {
    if (!privateRoomId) return;

    if (!socket.connected) {
      socket.connect();

      socket.on("connect", () => {
        setSocketConnected(true);
        console.log("🔌 Connected to socket server");
        socket.emit("join-room", privateRoomId);
        console.log("🔗 Joined room:", privateRoomId);
      });
    }

    // Handle code from others
    const handleIncomingCode = ({ diff, position, senderId }) => {
      if (!editorRef.current || senderId === socket.id) return;

      const editor = editorRef.current;
      const model = editor.getModel();
      if (!model) return;

      const currentPosition = model.getPositionAt(position);

      model.pushEditOperations(
        [],
        [
          {
            range: new monaco.Range(
              currentPosition.lineNumber,
              currentPosition.column,
              currentPosition.lineNumber,
              currentPosition.column
            ),
            text: diff,
          },
        ],
        () => null
      );
    };

    socket.on("code-change", handleIncomingCode);

    return () => {
      socket.off("code-change", handleIncomingCode);
      socket.disconnect();
      console.log("🧹 Disconnected from socket server");
    };
  }, [privateRoomId]);

  const handleCodeChange = (newCode) => {
    if (!editorRef.current) return;

    const editor = editorRef.current;
    const previousCode = editor.getValue();

    // Find inserted text (basic diffing: assume insertion at the end)
    let diffText = "";
    let position = 0;

    for (let i = 0; i < Math.min(previousCode.length, newCode.length); i++) {
      if (previousCode[i] !== newCode[i]) {
        position = i;
        diffText = newCode.slice(i);
        break;
      }
    }

    if (previousCode.length > newCode.length) {
      // Handle deletion (basic): entire remaining part deleted
      position = newCode.length;
      diffText = "";
    } else if (previousCode === newCode) {
      // No change
      return;
    } else if (diffText === "") {
      // If no character mismatch found, the new text is appended
      position = previousCode.length;
      diffText = newCode.slice(previousCode.length);
    }

    if (privateRoomId && socket.connected) {
      socket.emit("code-change", { privateRoomId, diff: diffText, position, senderId: socket.id });
    }

    setValue(newCode);
  };

  useEffect(() => {
    const lang = getLanguageName(languageId);
    const questionTitle = publicRoomId?.replace(/-/g, " ");
    if (questionTitle && window.defaultQuestionCode?.[questionTitle.toLowerCase()]) {
      setValue(window.defaultQuestionCode[questionTitle.toLowerCase()][lang] || CODE_SNIPPETS[lang]);
    } else {
      setValue(CODE_SNIPPETS[lang]);
    }
  }, [languageId]);

  useEffect(() => {
    const fetchDefaultCode = async () => {
      const title = publicRoomId?.replace(/-/g, " ");
      const lang = getLanguageName(languageId);
      if (!title) return;

      try {
        const res = await fetch(`${process.env.REACT_APP_TESTCASE_API}/default/${title}`);
        const data = await res.json();
        const defaultCode = data?.defaultCode;

        if (defaultCode) {
          setValue(defaultCode);
        }
      } catch (err) {
        console.error("Failed to load default code from backend", err);
      }
    };

    fetchDefaultCode();
  }, [publicRoomId]);

  return (
    <HStack align="start" spacing={4} p={4}>
      <Box w="100%">
        <Editor
          height="75vh"
          theme={theme}
          language={getLanguageName(languageId)}
          value={value}
          onMount={onMount}
          onChange={handleCodeChange}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            wordWrap: "on",
            scrollBeyondLastLine: false,
          }}
        />

        <div style={{ display: "flex", marginTop: "16px" }}>
          <LanguageSelector language={getLanguageName(languageId)} onSelect={onSelect} />
          <button
            onClick={() => setTheme(theme === "vs-dark" ? "light" : "vs-dark")}
            style={{
              marginLeft: "10px",
              width: "30%",
              height: "40px",
            }}
          >
            Change Theme
          </button>
        </div>
      </Box>
    </HStack>
  );
};

export default CodeEditor;