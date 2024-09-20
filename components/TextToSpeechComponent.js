"use client";
import {
  DownloadSimple,
  SpeakerHifi,
  SpeakerHigh,
} from "@phosphor-icons/react/dist/ssr";
import React, { useState, useEffect } from "react";

const TextToSpeechComponent = ({ text }) => {
  const [speechSynthesisSupported, setSpeechSynthesisSupported] =
    useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    if ("speechSynthesis" in window) {
      setSpeechSynthesisSupported(true);
      const synth = window.speechSynthesis;
      const voices = synth.getVoices();
      setVoices(voices);

      // Find Indian English female voice
      const indianFemaleVoice = voices.find(
        (voice) => voice.lang === "en-IN" && voice.name.includes("female")
      );
      if (indianFemaleVoice) {
        setSelectedVoice(indianFemaleVoice);
      } else {
        console.warn(
          "Indian English female voice not found. Defaulting to browser's default voice."
        );
        setSelectedVoice(synth.getVoices()[0]);
      }

      synth.onvoiceschanged = () => {
        setVoices(synth.getVoices());
      };
    } else {
      console.warn("Speech synthesis is not supported in this browser.");
    }
  }, []);

  const handleSpeak = () => {
    if (!speechSynthesisSupported) {
      console.warn("Speech synthesis is not supported in this browser.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    window.speechSynthesis.speak(utterance);
  };

  const handleDownload = () => {
    if (!speechSynthesisSupported) {
      console.warn("Speech synthesis is not supported in this browser.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    const synth = window.speechSynthesis;
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const dest = audioContext.createMediaStreamDestination();
    const source = audioContext.createMediaElementSource(new Audio());
    const recorder = new MediaRecorder(dest.stream);

    source.connect(dest);
    source.connect(audioContext.destination);

    utterance.onstart = () => {
      recorder.start();
    };

    utterance.onend = () => {
      recorder.stop();
    };

    recorder.ondataavailable = (event) => {
      const blob = new Blob([event.data], { type: "audio/wav" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "speech.wav";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    synth.speak(utterance);
  };

  if (!speechSynthesisSupported) {
    return <div>Speech synthesis is not supported in this browser.</div>;
  }

  return (
    <div className="flex items-center gap-2">
      <button
        className="py-0.5 px-2 rounded-md bg-orange-800 flex items-center gap-2"
        onClick={handleSpeak}
      >
        <SpeakerHigh />
        Speak
      </button>
      <button
        className="py-0.5 px-2 rounded-md bg-stone-600 flex items-center gap-2"
        onClick={handleDownload}
      >
        <DownloadSimple />
        Sound File
      </button>
    </div>
  );
};

export default TextToSpeechComponent;
