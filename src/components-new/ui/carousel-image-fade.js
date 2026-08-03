import React from "react";
import Slider from "react-slick";
import Head from "next/head";
import CardCarousel from "../card/card-carousel";
import GalleryImage from "./gallery-image";

export default function CarouselImageFade(props) {
  var settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    easing: "ease-in-out",
    autoplay: true,
    fade: true,
    autoplaySpeed: 1000,
  };
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
        {props.gallery.map((item, i) => (
          <figure className="w-full" key={i}>
            <GalleryImage
              src={item.url}
              width={576}
              height={359}
              quality={100}
              layout={"responsive"}
              alt="Imagem"
            />
          </figure>
        ))}
      </Slider>
    </>
  );
}
