import React from "react";
import BaseButton from "./buttons/BaseButton";
import { SignIn } from "@phosphor-icons/react/dist/ssr";
import TextButton from "./buttons/TextButton";

const HeaderNav = () => {
  return (
    <div className="ml-auto flex items-center font-medium gap-2">
      <BaseButton>Token</BaseButton>
      <BaseButton>Credits</BaseButton>
      <BaseButton>Developer</BaseButton>
      <BaseButton className=" bg-pink-600 hover:bg-pink-700">
        Somana-2.0.1
      </BaseButton>
      <BaseButton>
        GPT-3.5
        {/* <OpenAiLogo weight="regular" className="size-4" /> */}
      </BaseButton>
      <TextButton className="bg-indigo-600 hover:bg-indigo-600">
        Login
        <SignIn className="size-4" weight="bold" />
      </TextButton>
    </div>
  );
};

export default HeaderNav;
