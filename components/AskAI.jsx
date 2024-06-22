import {
  File,
  Gear,
  Microphone,
  PaperPlaneRight,
  Record,
  Sparkle,
  Steps,
} from "@phosphor-icons/react/dist/ssr";
import React from "react";

const AskAI = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="self-end flex items-center gap-2">
        <p className="flex items-center gap-1">
          <Sparkle weight="fill" className="text-pink-600" />
          New
        </p>
        <button className="font-medium flex items-center gap-2 py-1.5 px-4 bg-indigo-600 rounded-md">
          {/* <CircleDashed weight="bold" className="size-5 animate-spin" /> */}
          <Microphone weight="bold" />
          Talk with AI
        </button>
        {/* <CircleNotch weight="bold" className="size-5 animate-spin" /> */}
      </div>
      <textarea
        rows={3}
        placeholder="Somana 🦾"
        className="resize-none rounded-md outline-none border border-neutral-700 p-2 text-stone-300 bg-stone-800"
      />
      <div className="flex items-center gap-2">
        <button className="font-medium flex items-center gap-2 self-start py-1.5 px-4 bg-indigo-600 rounded-md">
          Send
          <PaperPlaneRight weight="bold" />
        </button>
        <button className="font-medium flex items-center gap-2 self-start py-1.5 px-4 bg-indigo-600 rounded-md">
          Voice
          <Record weight="bold" />
        </button>
        <button className="font-medium flex items-center gap-2 self-start py-1.5 px-4 bg-indigo-600 rounded-md">
          Upload File
          <File weight="bold" />
        </button>
        <button className="cursor-not-allowed font-medium flex items-center gap-2 self-start py-1.5 px-4 bg-indigo-600 rounded-md">
          Somana IBR
          {/* <Record weight="bold" /> */}
        </button>
        <button className="cursor-not-allowed font-medium flex items-center gap-2 self-start py-1.5 px-4 bg-indigo-600 rounded-md">
          Somana MBR
          {/* <Record weight="bold" /> */}
        </button>
        <button className="cursor-not-allowed font-medium flex items-center gap-2 self-start py-1.5 px-4 bg-indigo-600 rounded-md">
          Somana VBR
          {/* <Record weight="bold" /> */}
        </button>
        <button className="font-medium flex items-center gap-2 self-start py-1.5 px-4 bg-indigo-600 rounded-md">
          Services
          <Gear weight="bold" />
        </button>

        <p className="ml-auto font-medium text-sm bg-stone-100 text-stone-950 py-0.5 px-3 rounded-md">
          Copyright by Akarsh Rajput
        </p>
      </div>
    </div>
  );
};

export default AskAI;
