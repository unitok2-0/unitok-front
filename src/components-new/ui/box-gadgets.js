import Image from "next/image";
import { useState } from "react";

export default function BoxGadgets() {
  const [box, setBox] = useState(false);

  return (
    <div className="component-box-gadgets relative">
      <div className="relative block z-30">
        <div className="flex flex-wrap gap-2 md:w-[104px]">
          <figure
            className="bg-gray-light hover:bg-gray-mid rounded-lg flex justify-center items-center p-2 cursor-pointer"
            onClick={() => setBox(true)}
            onMouseLeave={() => setBox(false)}
          >
            <Image src="/public-new/icons/ui/gadget1.svg" width={18} height={18} />
          </figure>
          <figure
            className="bg-gray-light hover:bg-gray-mid rounded-lg flex justify-center items-center p-2 cursor-pointer"
            onClick={() => setBox(true)}
            onMouseLeave={() => setBox(false)}
          >
            <Image src="/public-new/icons/ui/gadget2.svg" width={18} height={18} />
          </figure>
          <figure
            className="bg-gray-light hover:bg-gray-mid rounded-lg flex justify-center items-center p-2 cursor-pointer"
            onClick={() => setBox(true)}
            onMouseLeave={() => setBox(false)}
          >
            <Image src="/public-new/icons/ui/gadget3.svg" width={18} height={18} />
          </figure>
          <figure
            className="bg-gray-light hover:bg-gray-mid rounded-lg flex justify-center items-center p-2 cursor-pointer"
            onClick={() => setBox(true)}
            onMouseLeave={() => setBox(false)}
          >
            <Image src="/public-new/icons/ui/gadget4.svg" width={18} height={18} />
          </figure>
        </div>
        <div
          className={` ${
            box ? "block" : "hidden"
          } w-64 h-auto bg-green-dark absolute md:right-28 md:top-0 rounded-md overflow-x-hidden`}
        >
          <p className="text-lg text-green-light font-bold leading-normal  p-6">
            Unitok é compatível com smartphones Android e iPhone
          </p>
          <figure className="flex">
            <Image
              src="/public-new/img/ui/unitok1.gif"
              width={259}
              height={262}
              quality={100}
            ></Image>
          </figure>
        </div>
      </div>
      <div
        className={`${
          box ? "block" : "hidden"
        } bg-white bg-opacity-80 w-screen h-screen fixed top-0 left-0 block z-10`}
      ></div>
    </div>
  );
}
