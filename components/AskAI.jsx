"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Circle,
  Headset,
  Play,
  Spinner,
  Stop,
  Upload,
} from "@phosphor-icons/react/dist/ssr";
import SpeechRecognitionComponent from "./speechRecognition";
import TextToSpeechComponent from "./TextToSpeechComponent";

const AskAI = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");

  const [loadingResponse, setLoadingResponse] = useState(false);

  const [chatHistory, setChatHistory] = useState([]);
  const [shouldRestartListening, setShouldRestartListening] = useState(false);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (!listening && transcript) {
      handleGenerate();
    }
  }, [listening, transcript]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleGenerate = async () => {
    try {
      setLoadingResponse(true);
      const res = await fetch("/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Always give prompt response in HTML format without any special characters if not required. Prompt - ${transcript}`,
        }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      const newResponse = data.text;

      setChatHistory((prev) => [
        ...prev,
        { type: "user", text: transcript },
        { type: "ai", text: newResponse },
      ]);
      setTranscript("");
    } catch (error) {
      console.error("Failed to fetch:", error);
      setChatHistory((prev) => [
        ...prev,
        { type: "user", text: transcript },
        { type: "ai", text: "Failed to generate text." },
      ]);
    } finally {
      setLoadingResponse(false);
      if (shouldRestartListening) {
        setListening(true);
        setShouldRestartListening(false);
      }
    }
  };

  const handleStartListening = () => {
    setListening(true);
  };

  const handleStopListening = () => {
    setListening(false);
    setInterimTranscript("");
    setShouldRestartListening(true);
  };

  const handleStopAll = () => {
    setListening(false);
    setTranscript("");
    setInterimTranscript("");
    setShouldRestartListening(false);
  };

  return (
    <div className="mt-auto flex p-2 flex-col w-full h-full">
      <div className="p-2 flex flex-col rounded-md gap-2 h-full">
        <div className="w-full flex flex-col gap-2 resize-none rounded-md outline-none h-full p-2 text-stone-300 bg-stone-900">
          <div className="flex items-center gap-2">
            <TextToSpeechComponent
              text={`Somana is speaking ${chatHistory
                .map((entry) => entry.text)
                .join(" ")}`}
            />
            
            {loadingResponse && (
              <div className="flex items-center gap-2 ml-auto">
                <p>Generating</p>
                <Spinner weight="bold" className="size-4 animate-spin" />
              </div>
            )}
          </div>

          <div
            ref={chatContainerRef}
            className="flex flex-col gap-2 h-[32rem] overflow-y-auto bg-stone-950 p-2 rounded-md text-stone-300"
          >
            {chatHistory.map((entry, index) => (
              <div
                key={index}
                className={`flex ${
                  entry.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-2 rounded-md max-w-2xl ${
                    entry.type === "user" ? " text-white" : " text-stone-300"
                  }`}
                  dangerouslySetInnerHTML={{ __html: entry.text }}
                ></div>
              </div>
            ))}
          </div>

          <textarea
            rows={1}
            className="resize-none bg-stone-950 outline-none cursor-default mt-auto p-1 rounded-md"
            value={transcript + interimTranscript}
            readOnly
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-auto">
        <div className="self-end flex items-center gap-2 px-2">
          {listening && (
            <div className="flex items-center gap-2">
              {/* <Circle className="size-4 animate-ping mr-4" weight="bold" /> */}
              <Headset weight="bold" className="size-5" />
              ... listening
            </div>
          )}
          <button
            onClick={handleStartListening}
            disabled={listening}
            className="font-medium flex items-center gap-2 py-1 px-2 bg-indigo-600 rounded-md"
          >
            <Play weight="fill" />
            Start
          </button>
          <button
            onClick={handleStopListening}
            disabled={!listening}
            className="font-medium flex items-center gap-2 py-1 px-2 bg-red-600 rounded-md"
          >
            <Stop weight="fill" />
            Stop
          </button>
        </div>
        <div className="px-2 py-0 w-full">
          <textarea
            rows={4}
            className="resize-none bg-stone-900 w-full outline-none mt-auto p-2 rounded-md border border-stone-600"
            placeholder="Chat with AI..."
          />
        </div>
        <div className="flex items-center gap-2 py-0 px-2">
          <button
            onClick={handleGenerate}
            className="font-medium flex items-center gap-2 self-start py-1.5 px-4 bg-emerald-700 rounded-md"
          >
            <Upload />
            Send
          </button>
          <p className="ml-auto font-medium text-sm bg-stone-100 text-stone-950 py-0.5 px-3 rounded-md">
            Copyright by Akarsh Rajput
          </p>
        </div>
      </div>
      <SpeechRecognitionComponent
        setTranscript={setTranscript}
        setInterimTranscript={setInterimTranscript}
        startListening={listening}
        stopListening={!listening}
        onStopListening={handleStopListening}
      />
    </div>
  );
};

export default AskAI;
