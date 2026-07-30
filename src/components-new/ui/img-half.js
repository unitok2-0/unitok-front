import Image from "next/image";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLayoutEffect, useEffect } from "react";

export const useBrowserLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : () => { };

export default function ImgHalf(props) {
  let classImage = "";

  if (props.inverse) {
    // LEFT
    classImage = "mb:pl-20 pt-8";
  } else {
    // RIGHT
    classImage = "mb:pr-20 pb-8";
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const animation = () => {
      setTimeout(() => {
        gsap.to(".component-img-half .frame", {
          height: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".component-img-half .frame",
            start: "top 30%",
          },
        });
      }, 1400);
    }
  }, []);

  return (
    <figure
      className={`component-img-half mb:w-6/12 w-[120%] mb:ml-0 mb:mr-0 ml-[-10%] mr-[-10%] mb-0 flex mb:justify-start items-center object-contain bg-green-light px-8 justify-center ${classImage} ${props.class} mb:py-24 mb:px-0 mb:pb-20 md:px-24 md:pb-20 relative`}
    >
      <picture
        className={` ${props.inverse ? "rounded-l" : "rounded-r"
          } relative  overflow-hidden`}
      >
        <Image src={props.img} width={606} height={530} quality={100} />
        {/* <span className="frame absolute bottom-0 left-0 w-full h-full bg-green-black"></span> */}
      </picture>
    </figure>
  );
}
