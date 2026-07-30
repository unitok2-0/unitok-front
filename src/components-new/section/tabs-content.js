import Image from "next/image";
import { useState } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect } from "react";
import RemoveHtml from "../helpers/remove-html";

export default function TabsContent(props) {
  const data = props.data;
  const [slide, setSlide] = useState(data[0]);

  function changeSlide(label) {
    const slide = data.filter((data) => {
      return data.Legenda === label;
    });
    setSlide(slide[0]);
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const animation = () => {
      setTimeout(() => {
        gsap.from(".list-options .item", {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: 0.1,
          ease: "power3.out",
          autoAlpha: 0,
          scrollTrigger: {
            trigger: ".component-tab-content",
            start: "top 50%",
          },
          stagger: 0.05,
        });

        gsap.from(".component-tab-content article > *", {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: 0.1,
          ease: "power3.out",
          autoAlpha: 0,
          scrollTrigger: {
            trigger: ".component-tab-content",
            start: "top 50%",
          },
          stagger: 0.05,
        });

        gsap.from(".component-tab-content figure", {
          y: 20,
          opacity: 0,
          duration: 1.4,
          delay: 0.1,
          ease: "power3.out",
          autoAlpha: 0,
          scrollTrigger: {
            trigger: ".component-tab-content",
            start: "top 50%",
          },
        });
      }, 1400);
    }
  }, []);

  return (
    <div className="component-tab-content flex mb:flex-row flex-col bg-gray-mid rounded-lg px-6 py-6 mt-28 justify-between">
      <div className="flex mb:flex-row flex-col-reverse mb:w-4/6 w-full justify-between">
        <div className="list-options col-1 mb:w-1/2 w-full 2xl:pr-20 xl:pr-12 pr-6 flex mb:flex-col flex-row md:justify-center gap-y-4 mb:gap-x-0 md:gap-x-8 justify-between mb:mb-0 mb-8">
          {data.map((item, i) => {
            return (
              <div
                key={item.Legenda}
                className={`item ${slide.Legenda == item.Legenda
                  ? "bg-white"
                  : "hover:bg-gray-light hover:bg-opacity-60 "
                  } rounded-md md:p-4 p-3 mb:pr-8 flex mb:flex-row flex-col items-center justify-between cursor-pointer transition duration-200 ease-out `}
                onClick={() => changeSlide(item.Legenda)}
              >
                <div className="flex items-center">
                  <div
                    className={` ${slide.Legenda == item.Legenda ? "bg-orange" : "bg-green-dark"
                      } min-w-[48px] min-h-[48px]  rounded-full flex justify-center items-center`}
                  >
                    <Image src={item.Icon.url} width={24} height={24} />
                  </div>
                  <h3
                    className={`${slide.Legenda == item.Legenda
                      ? "text-orange"
                      : "text-green-dark"
                      } text-sm font-bold pl-6 text-left mb:flex hidden w-9/12`}
                  >
                    {item.Legenda}
                  </h3>
                </div>

                <figure className="mb:rotate-0 rotate-90 mt-1">
                  <Image
                    src="/public-new/icons/section/arrow.svg"
                    width={14}
                    height={14}
                  />
                </figure>
              </div>
            );
          })}
        </div>
        <div className="col-2 mb:w-1/2 w-full flex justify-center">
          <figure className="-mt-32 mb:-mb-40 mb:absolute">
            <Image src={slide?.Imagem.url} width={429} height={637} quality={100} />
          </figure>
        </div>
      </div>
      <article className="col-3 mb:w-2/6 w-full lg:pr-14 pr-6 lg:pl-0 pl-4 flex flex-col justify-center">
        <span className="mb:hidden block text-xs text-orange font-bold uppercase mb-2">
          {slide.Legenda}
        </span>
        <h4 className="typ-text-4 text-green-dark font-bold mb-6">
          <RemoveHtml>{slide.Titulo}</RemoveHtml>
        </h4>
        <p className="typ-p text-gray-dark">
          <RemoveHtml>{slide.Texto}</RemoveHtml>
        </p>
      </article>
    </div>
  );
}
