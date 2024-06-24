"use client";
import React, { useState, useEffect } from "react";
import {
  Circle,
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

  const [response, setResponse] = useState("");
  const [loadingResponse, setLoadingResponse] = useState(false);

  const [chatHistory, setChatHistory] = useState("");
  const [shouldRestartListening, setShouldRestartListening] = useState(false); // New state to track if the mic should restart

  useEffect(() => {
    if (!listening && transcript) {
      handleGenerate();
    }
  }, [listening, transcript]);

  const handleGenerate = async () => {
    try {
      setLoadingResponse(true);
      const res = await fetch("/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Always respond within 100 to 200 words. Give only required prompt answer. Your name is Somana version 1.0.2. After giving answer, if required chat with user. Prompt -  ${transcript}`,
        }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      const newResponse = data.text;

      setChatHistory(
        (prev) => `${prev}\nUser: ${transcript}\nAI: ${newResponse}`
      );
      setResponse((prev) => `${prev}\n${newResponse}`);
      setTranscript("");
    } catch (error) {
      console.error("Failed to fetch:", error);
      setResponse("Failed to generate text.");
    } finally {
      setLoadingResponse(false);
      if (shouldRestartListening) {
        setListening(true); // Restart the microphone if it should restart
        setShouldRestartListening(false); // Reset the flag
      }
    }
  };

  const handleStartListening = () => {
    setListening(true);
  };

  const handleStopListening = () => {
    setListening(false);
    setInterimTranscript(""); // Clear interim transcript when stopping
    setShouldRestartListening(true); // Set the flag to restart listening
  };

  const handleStopAll = () => {
    setListening(false);
    setTranscript("");
    setInterimTranscript("");
    setShouldRestartListening(false); // Ensure the flag is reset
  };

  return (
    <div className="mt-auto flex p-3 flex-col w-full h-full">
      <div className="p-2 flex flex-col rounded-md gap-2 h-full">
        <div className="w-full flex flex-col gap-2 resize-none rounded-md outline-none h-full p-2 text-stone-300 bg-stone-900">
          <div className="flex items-center gap-2">
            <TextToSpeechComponent text={`Somana speaking ${chatHistory}`} />
            {loadingResponse && (
              <div className="flex items-center gap-2 ml-auto">
                <p>Generating</p>
                <Spinner weight="bold" className="size-4 animate-spin" />
              </div>
            )}
          </div>

          <textarea
            className="resize-none font-medium h-full outline-none cursor-default bg-stone-950 p-2 rounded-md"
            readOnly
            value={chatHistory}
            placeholder="Dashboard"
          />
          <textarea
            rows={1}
            className="resize-none bg-stone-950 outline-none cursor-default mt-auto p-1 rounded-md"
            value={transcript + interimTranscript}
            readOnly
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-auto ">
        <div className="self-end flex items-center gap-2 px-2">
          {listening && (
            <div className="flex items-center gap-2">
              <Circle className="size-4 animate-ping mr-4" weight="bold" />
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
          {/* <button
            onClick={handleStopAll}
            className="font-medium flex items-center gap-2 py-1 px-4 bg-red-600 rounded-sm"
          >
            Stop All
          </button> */}
        </div>
        <div className="px-2 py-0 w-full">
          <textarea
            rows={4}
            className="resize-none bg-stone-900 w-full outline-none  mt-auto p-2 rounded-md border border-stone-600"
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
          {/* <button className="font-medium flex items-center gap-2 self-start py-1.5 px-4 bg-indigo-600 rounded-md">
            Voice
          </button>
          <button className="font-medium flex items-center gap-2 self-start py-1.5 px-4 bg-indigo-600 rounded-md">
            Upload File
          </button>
          <button className="cursor-not-allowed font-medium flex items-center gap-2 self-start py-1.5 px-4 bg-indigo-600 rounded-md">
            Somana IBR
          </button>
          <button className="cursor-not-allowed font-medium flex items-center gap-2 self-start py-1.5 px-4 bg-indigo-600 rounded-md">
            Somana MBR
          </button>
          <button className="cursor-not-allowed font-medium flex items-center gap-2 self-start py-1.5 px-4 bg-indigo-600 rounded-md">
            Somana VBR
          </button>
          <button className="font-medium flex items-center gap-2 self-start py-1.5 px-4 bg-indigo-600 rounded-md">
            Services
          </button> */}
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
