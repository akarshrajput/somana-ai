import React from "react";
import BaseButton from "./buttons/BaseButton";
import { Binoculars, Package } from "@phosphor-icons/react/dist/ssr";

const SideBar = () => {
  return (
    <div className="p-3 font-medium h-full">
      <div className="flex flex-col gap-2 h-full ">
        <div className="flex flex-col gap-2">
          <BaseButton className="justify-center bg-purple-600 hover:bg-purple-700">
            Somana services
            <Package weight="bold" />
          </BaseButton>
          <BaseButton className="justify-center bg-purple-600 hover:bg-purple-700">
            Explore
            <Binoculars weight="bold" />
          </BaseButton>
          <p className="justify-center">History</p>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 ">
          <BaseButton className="bg-red-600  hover:bg-red-600 text-stone-200  justify-center">
            Signup
          </BaseButton>
          <BaseButton className="justify-center">Login</BaseButton>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
