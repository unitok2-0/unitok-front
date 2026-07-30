import React from "react";
import Slider from "react-slick";
import Head from "next/head";
import CardVideo from "../card/card-video";

export default function CarouselVideoSimple(props) {
  var settings = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 360,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
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
    <div>
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
      <Slider className='w-full'{...settings}>{listItens(props.list)}</Slider>
    </div>
  );
}

function listItens(list) {
  const listCf = list.map((item, i) => (
    <div className="pr-4 md:ml-[15%]" key={item}>
      <CardVideo video={item?.Imagem?.url}></CardVideo>
    </div>
  ));
  return listCf;
}
