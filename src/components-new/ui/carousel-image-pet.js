import React from "react";
import Slider from "react-slick";
import Head from "next/head";
import GalleryImage from "./gallery-image";

export default function CarouselImagePet(props) {
  var settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    easing: "ease-in-out",
    autoplay: true,
    autoplaySpeed: 2400,
    fade: true,
    pauseOnHover: false,
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
            <picture className="flex justify-end ">
              <GalleryImage src={item.url} width={519} height={537} quality={100} alt="Imagem" />
            </picture>
          </figure>
        ))}
      </Slider>
    </>
  );
}
