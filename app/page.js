"use client";
import AskAI from "@/components/AskAI";
import Response from "@/components/Response";

export default function Home() {
  return (
    <div className="p-4 flex flex-col h-full gap-2">
      <div className=" h-full rounded-md">
        <Response />
      </div>
      <div className="mt-auto">
        <AskAI />
      </div>
    </div>
  );
}
