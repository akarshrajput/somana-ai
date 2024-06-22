import React from "react";
import BaseButton from "./buttons/BaseButton";
import { SignIn } from "@phosphor-icons/react/dist/ssr";

const HeaderNav = () => {
  return (
    <div className="ml-auto flex items-center gap-2">
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
      <BaseButton className="bg-indigo-800 hover:bg-indigo-900">
        Login
        <SignIn className="size-4" weight="bold" />
      </BaseButton>
    </div>
  );
};

export default HeaderNav;
