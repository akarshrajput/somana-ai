import { Spinner } from "@phosphor-icons/react/dist/ssr";
import React from "react";

const Response = () => {
  return (
    <div className="p-2 flex flex-col rounded-md gap-2  h-full">
      <div className="flex items-center gap-2">
        <p>Generating</p>
        <Spinner weight="bold" className="size-4 animate-spin" />
      </div>
      <textarea
        rows={10}
        readOnly
        className="w-full resize-none rounded-md outline-none h-full p-2 text-stone-300 bg-stone-950"
      />
    </div>
  );
};

export default Response;
