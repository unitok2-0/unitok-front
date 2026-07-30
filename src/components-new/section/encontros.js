import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ImgHalf from "../ui/img-half";
import ReactHtmlParser from "react-html-parser";

export default function Encontros(props) {
  const [slide, setSlide] = useState(props.slides[0]);
  let count = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      handleChange();
    }, 3000);
  }, []);

  const handleChange = () => {
    count = count + 1;
    if (count > props.slides.length - 1) {
      count = 0;
    }
    setSlide(props.slides[count]);
  };

  return (
    <div className="component-encontros flex md:flex-row flex-col justify-between items-center relative">
      <article className="md:w-6/12 w-full md:p-12 py-12 flex flex-col md:pr-24 relative">
        <h2 className="title md:typ-text-2 text-2xlMax text-green-light mb-8">
          {ReactHtmlParser(slide.Titulo)}
        </h2>
        <div className="typ-p text-white font-light md:w-10/12 w-full leading-loose">
          {ReactHtmlParser(slide.Texto)}
        </div>
        <div className="w-full md:flex hidden justify-start mt-12">
          <Link href={slide.Botao.Link} className="btn" target="_blank">

            {slide.Botao.Legenda}

          </Link>
        </div>
      </article>
      <ImgHalf img={slide?.Imagem.url}></ImgHalf>
      <figure className="absolute md:block hidden top-20 w-[288px] left-44 right-0 mx-auto z-10 ">
        <Image
          src="/public-new/img/cartao-visita/img5.png"
          width={288}
          height={228}
          quality={100}
          layout="responsive"
        />
      </figure>
    </div>
  );
}
