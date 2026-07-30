import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CtaCall() {
  const [open, setOpen] = useState(false);

  const triggerOpen = () => {
    setOpen((prevState) => {
      return !prevState;
    });
  };

  return (
    <div
      className="bg-green-dark rounded-full flex justify-start items-center fixed 2xl:bottom-20 md:bottom-10 right-8 bottom-16 drop-shadow-3xl z-30 cursor-pointer transition-all duration-300 ease-out mb-4"
      onClick={triggerOpen}
    >
      <div
        className={`flex gap-x-6 px-6 transition-all ${
          open ? "flex" : "hidden"
        }`}
      >
        <Link href="tel:(19) 4042-0134">

          <figure className={`transition-all ${open ? "flex" : "hidden"}`}>
            <Image src="/public-new/icons/ui/cta_phone.svg" width={24} height={24} />
          </figure>

        </Link>
        <Link href='https://api.whatsapp.com/send?phone=08004550800' target='_blank'>

          <figure className={`transition-all ${open ? 'flex' : 'hidden'}`}>
            <Image
              src='/public-new/icons/ui/cta_whatsapp.svg'
              width={24}
              height={24}
            />
          </figure>

        </Link>
      </div>

      <div
        className={`w-12 flex h-12 justify-center items-center rounded-full ${
          open ? "bg-green-mid " : ""
        }`}
      >
        <figure className={`transition-all ${open ? "hidden" : "flex"}`}>
          <Image src="/public-new/icons/ui/cta_chat.svg" width={24} height={24} />
        </figure>
        <figure className={`transition-all ${open ? "flex" : "hidden"}`}>
          <Image src="/public-new/icons/ui/cta_close.svg" width={18} height={18} />
        </figure>
      </div>
    </div>
  );
}
