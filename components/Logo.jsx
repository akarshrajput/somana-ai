import { CircleDashed } from "@phosphor-icons/react/dist/ssr";
import React from "react";

const Logo = () => {
  return (
    <div className="text-xl font-medium text-purple-300 flex items-center gap-2">
      <CircleDashed weight="bold" className="size-6   animate-spin" />
      Somana
    </div>
  );
};

export default Logo;
