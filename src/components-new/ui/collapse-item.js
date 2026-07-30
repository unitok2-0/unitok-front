import Image from "next/image";
import { useState } from "react";

export default function CollapseItem({ children, label }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="collapse-item w-full py-7 border-b border-gray-box">
        <div
          className="flex items-center justify-between px-0 cursor-pointer hover:underline"
          onClick={() => setOpen(!open)}
        >
          <h3 className="w-11/12 text-base text-green-dark font-bold">
            {label}
          </h3>
          <figure>
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
          <article className="typ-p leading-relaxed text-gray-dark pt-4">
            {children}
          </article>
        )}
      </div>
    </>
  );
}
