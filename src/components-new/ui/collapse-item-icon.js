import Image from "next/image";
import { useState } from "react";

export default function CollapseItemIcon({
  children,
  label,
  icon,
  iconActive,
}) {
  const [open, setOpen] = useState(false);
  const colorText = open ? "text-orange" : "text-green-dark";

  return (
    <>
      <div className="collapse-item w-full py-6 bg-gray-light rounded-md pl-4 pr-8 mb-2">
        <div
          className={`flex md:flex-row flex-col md:items-center items-start justify-start px-0 cursor-pointer relative ${colorText}`}
          onClick={() => setOpen(!open)}
        >
          <figure className="flex w-14 justify-center h-9 relative">
            <picture className={`flex justify-center items-center`}>
              <Image
                src={open ? icon : iconActive}
                width={36}
                height={36}
                // layout="fill"
              />
            </picture>
          </figure>
          <h3
            className={`text-base w-10/12 font-bold md:ml-6 ml-4 mt-1 ${colorText} `}
          >
            {label}
          </h3>
          <figure className="absolute right-0 mb:bottom-auto bottom-2">
            <picture
              className={`flex transition-all ${open ? "rotate-180" : ""}`}
            >
              <Image
                src="/public-new/icons/ui/arrow-collapse.svg"
                width={20}
                height={10}
              />
            </picture>
          </figure>
        </div>
        {open && (
          <article className="typ-p leading-relaxed text-gray-dark pt-4 md:pl-20 pl-4">
            {children}
          </article>
        )}
      </div>
    </>
  );
}
