import React from "react";
import Slider from "react-slick";
import Head from "next/head";
import CardCarousel from "../card/card-carousel";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLayoutEffect, useEffect } from "react";
import { isImageExist } from "../helpers/check-image";

export const useBrowserLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : () => { };

export default function Carousel(props) {
  var settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 360,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerPadding: "100px",
    centerMode: false,
    easing: "ease-in-out",
    autoplay: true,
    autoplaySpeed: 1360,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1360,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const list = props.list.Items


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const animation = () => {
      setTimeout(() => {
        gsap.from(".slick-track > *", {
          y: 10,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".slick-slider",
            start: "top 60%",
          },
          stagger: 0.1,
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
      <Slider {...settings}>
        {list?.map((block, i) => {
          const item = {
            'icon': isImageExist(block?.Imagem),
            'title': block.Titulo,
            'text': block.Texto,
          }
          return (
            <div className="md:p-4 py-4 px-0" key={i}>
              <CardCarousel bgWhite={props.bgWhite} item={item}></CardCarousel>
            </div>
          )
        })}
      </Slider>
    </>
  );
}

export async function getStaticProps() { }
