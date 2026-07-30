import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLayoutEffect, useRef, useEffect } from "react";

export const useBrowserLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : () => { };

export default function CardGreenImage(data) {
  const [hover, setHover] = useState(0);

  const box = useRef();
  const frameImage = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const animation = () => {
      setTimeout(() => {
        gsap.to(frameImage.current, {
          height: 0,
          duration: 0.6,
          ease: "expo.out",
          scrollTrigger: {
            trigger: box.current,
            start: "top 40%",
          },
        });
      }, 1400);
    }
  }, []);

  return (
    <div
      ref={box}
      className="component-card-green rounded bg-green-dark border border-green-black hover:bg-green-light transition-all overflow-hidden"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link href={data.link}>

        <div className="p-8">
          <figure className="mb-16 mt-3 max-w-[48px]">
            {(() => {
              if (data.icon && data.iconHover) {
                return (
                  hover ? (
                    <Image src={data.iconHover} width={48} height={48} />
                  ) : (
                    <Image src={data.icon} width={48} height={48} />
                  )
                )
              } else {
                return (
                  <div></div>
                )
              }
            })()}
          </figure>
          <h3
            className={`mb:text-3xl text-2xl font-light mb-6 transition-all ${hover ? "text-green-dark" : "text-green-light"
              }`}
          >
            {data.title}
          </h3>
          <div className="flex justify-start">
            <div
              className={`text-base font-bold flex items-center transition-al ${hover ? "text-orange" : "text-white"
                }`}
            >
              <span
                className={`border-b  ${hover ? "border-orange" : "border-white"
                  }`}
              >
                Saiba mais
              </span>
              <figure
                className={`mt-1.5 transition-all ${hover ? "ml-6" : "ml-3"}`}
              >
                <svg
                  width="10"
                  height="16"
                  viewBox="0 0 10 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.39844 0.799979L8.59842 7.99996L1.39844 15.2"
                    stroke={`${hover ? "#FF4C1C" : "white"}`}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </figure>
            </div>
          </div>
        </div>
        <figure className="rounded-b overflow-hidden -mb-2">
          <picture className="relative">
            {data.img &&
              <Image
                src={data.img}
                width={381}
                height={279}
                layout="responsive"
              />
            }
            {/* <span
              ref={frameImage}
              className="frame-img absolute top-0 left-0 bg-green-black w-full h-full"
            ></span> */}
          </picture>
        </figure>

      </Link>
    </div>
  );
}
