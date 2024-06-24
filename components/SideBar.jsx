import BaseButton from "./buttons/BaseButton";
import { Binoculars, Package } from "@phosphor-icons/react/dist/ssr";
import TextButton from "./buttons/TextButton";
const SideBar = () => {
  return (
    <div className="p-4 font-medium w-full h-full">
      <div className="flex flex-col gap-2 h-full ">
        <div className="flex flex-col gap-2">
          <p className="border-l-4 pl-1 border-orange-600">
            Click on Start to play simulation
          </p>
          <p>
            <mark className=" bg-transparent text-orange-600">WARNING :</mark>{" "}
            avilable on chrome only !
          </p>
          <p>
            SOMANA Gen-5-B model :
            <mark className=" bg-transparent text-orange-600"> TEST PHASE</mark>
          </p>
          <p>
            Powered by :
            <mark className=" bg-transparent text-orange-600">
              {" "}
              GEMINI [ Alphabet ]
            </mark>
          </p>
          <BaseButton className="justify-center bg-purple-600 hover:bg-purple-700">
            Somana services
            <Package weight="bold" />
          </BaseButton>
          <BaseButton className="justify-center bg-purple-600 hover:bg-purple-700">
            Explore
            <Binoculars weight="bold" />
          </BaseButton>
          <div className="border flex flex-col h-80 border-stone-600 overflow-hidden rounded-md">
            <p className="justify-center text-center bg-stone-200 text-stone-800">
              History
            </p>
            <div className="p-1">
              <p className="bg-stone-800 p-0.5 rounded-sm">
                Hi Sonama how are you?
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <BaseButton className="justify-center bg-purple-600 hover:bg-purple-700">
            Somana services
            <Package weight="bold" />
          </BaseButton>
          <BaseButton className="justify-center bg-purple-600 hover:bg-purple-700">
            Somana services
            <Package weight="bold" />
          </BaseButton>
          <BaseButton className="justify-center bg-purple-600 hover:bg-purple-700">
            Somana services
            <Package weight="bold" />
          </BaseButton>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 ">
          <TextButton className="bg-red-600  hover:bg-red-600 text-stone-200  justify-center">
            Signup
          </TextButton>
          <TextButton className="bg-stone-200 text-stone-800  hover:bg-stone-300 justify-center">
            Login
          </TextButton>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
