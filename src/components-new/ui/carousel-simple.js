import React from "react";
import Slider from "react-slick";
import Head from "next/head";
import CardSimple from "../card/card-simple";

export default function CarouselSimple(props) {
  var settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 360,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerPadding: "100px",
    centerMode: false,
    easing: "ease-in",
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
      <Slider {...settings}>{listItens(props.list)}</Slider>
    </>
  );
}

function listItens(list) {
  const listCf = list.map((item, i) => (
    <div className="md:p-4 py-4 px-0" key={item}>
      <CardSimple image={item?.Imagem?.url} text={item.Texto}></CardSimple>
    </div>
  ));
  return listCf;
}
