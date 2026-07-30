import Image from "next/image";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLayoutEffect, useRef, useEffect } from "react";
import Markdown from "markdown-to-jsx";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function CardInfo(data) {
  const boxRef = useRef();
  const img = useRef();
  const title = useRef();
  const text = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const animation = () => {
      setTimeout(() => {
        gsap.from(img.current, {
          y: 24,
          scale: 0.6,
          duration: 1.2,
          opacity: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: boxRef.current,
            start: "top 60%",
          },
        });
        gsap.from(title.current, {
          y: 24,
          duration: 1.2,
          opacity: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: boxRef.current,
            start: "top 60%",
          },
        });
        gsap.from(text.current, {
          y: 24,
          duration: 1.2,
          delay: 0.2,
          opacity: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: boxRef.current,
            start: "top 60%",
          },
        });
      }, 1400);
    }
  }, []);

  return (
    <div className="component-card-info w-full" ref={boxRef}>
      <figure
        className="w-10 h-10 mb-0 flex items-center relative"
        ref={img}
      >
        <picture className="w-full h-12 float-right">
          {data.icon && 
            <Image src={data.icon} layout="fill" className="left-0" />
          }
        </picture>
      </figure>
      <h3
        className="typ-text-4 text-green-dark font-bold leading-7 mt-6 mb-3"
        ref={title}
      >
        {data.title}
      </h3>
      <article className="typ-p text-gray-dark leading-7" ref={text}>
        <Markdown>
          {data.text}
        </Markdown>
      </article>
    </div>
  );
}
