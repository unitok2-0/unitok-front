import React from "react";
import Slider from "react-slick";
import Head from "next/head";
import Image from "next/image";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLayoutEffect, useRef, useEffect } from "react";

export const useBrowserLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : () => { };

export default function EmpresasClientes(props) {
  var settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 360,
    slidesToShow: 7,
    slidesToScroll: 1,
    centerPadding: "100px",
    centerMode: false,
    easing: "ease-in",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1281,
        settings: {
          slidesToShow: 5,
        },
      },
    ],
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const animation = () => {
      setTimeout(() => {
        gsap.from(".slick-slide", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".slick-slider",
            start: "top 80%",
          },
          trigger: 0.4,
        });
      }, 1400);
    }
  }, []);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <h3 className="text-xxs text-orange font-bold uppercase tracking-wide text-center">
        {props.data.Titulo}
      </h3>
      <div className="w-full">
        <Slider id={"teste"} {...settings}>
          {listItens(props.data.Galeria)}
        </Slider>
      </div>
    </>
  );
}

function listItens(list) {
  const listCf = list?.map((item, i) => (
    <figure key={i}>
      <picture className="flex justify-center">
        <Image src={item.url} width={105} height={70} quality={100} alt="Imagem" />
      </picture>
    </figure>
  ));
  return listCf;
}