"use client";
import { useState, useEffect, useRef } from "react";

const SpeechRecognitionComponent = ({
  setTranscript,
  setInterimTranscript,
  startListening,
  stopListening,
  onStopListening,
}) => {
  const recognitionRef = useRef(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const inactivityTimerRef = useRef(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";
      recognitionRef.current = recognition;

      recognition.onresult = (event) => {
        clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = setTimeout(() => {
          recognition.stop();
        }, 1000);

        let finalTranscript = "";
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPart + " ";
          } else {
            interimTranscript += transcriptPart;
          }
        }
        setInterimTranscript(interimTranscript);
        setTranscript((prevTranscript) => prevTranscript + finalTranscript); // Append to previous transcript
      };

      recognition.onend = () => {
        setIsRecognizing(false);
        if (onStopListening) {
          onStopListening();
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsRecognizing(false);
        if (onStopListening) {
          onStopListening();
        }
      };
    } else {
      console.warn("Speech recognition not supported in this browser");
    }
  }, [setTranscript, setInterimTranscript, onStopListening]);

  useEffect(() => {
    if (startListening && !isRecognizing) {
      try {
        recognitionRef.current.start();
        setIsRecognizing(true);
        inactivityTimerRef.current = setTimeout(() => {
          recognitionRef.current.stop();
        }, 3000); // Set initial timer for 3 seconds of inactivity
      } catch (e) {
        console.error("Error starting speech recognition:", e);
      }
    } else if (!startListening && isRecognizing) {
      try {
        recognitionRef.current.stop();
        setIsRecognizing(false);
      } catch (e) {
        console.error("Error stopping speech recognition:", e);
      }
    }
  }, [startListening, isRecognizing]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current && isRecognizing) {
        recognitionRef.current.stop();
      }
      clearTimeout(inactivityTimerRef.current);
    };
  }, [isRecognizing]);

  return null; // This component does not need to render anything
};

export default SpeechRecognitionComponent;
