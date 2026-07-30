import Image from "next/image";
import Link from "next/link";
import BtnFixedMobile from "../ui/btn-fixed-mobile";

export default function HeroImgText(data) {
  return (
    <section className="w-full">
      <div className="mx-auto 2xl:w-10/12 2xl:px-4 md:w-11/12 w-full px-0 ">
        <div className="component-hero-img-text w-full mx-auto flex mb:flex-row flex-col justify-between bg-gray-mid rounded-md relative overflow-hidden min-h-[70vh]">
          <div className="mb:w-6/12 flex relative">
            <figure className="lg:hidden block mb-0 mb:rounded-l-sm rounded-none rounded-t-md  overflow-hidden h-full w-full relative">
              {data.img &&
                <Image
                  src={data.img}
                  width={776}
                  height={685}
                  quality={100}
                  layout="responsive"
                />
              }
            </figure>
            <figure className="md:block hidden absolute w-full h-full">
              {data.img &&
                <Image
                  src={data.img}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                />
              }
            </figure>
          </div>
          <article className="mb:w-6/12 w-full md:p-20 px-7 py-10 flex flex-col justify-center">
            <span className="text-xxs text-orange tracking-wider font-bold md:mb-8 mb-4">
              {data.label}
            </span>
            <h1 className="typ-text-2 text-green-dark mb-6">{data.title}</h1>
            {createText(data.text)}
            <div className="md:mt-14"></div>
            <BtnFixedMobile
              link={data.btn_link}
              label={data.btn_label}
              externo={data.btn_externo}
            ></BtnFixedMobile>
          </article>
        </div>
      </div>
    </section>
  );
}

function createBtn(label, link) {
  if (label) {
    return (
      <div className="md:relative fixed md:w-auto w-full bottom-0 left-0 z-40">
        <Link
          href={link}
          className="btn md:w-auto w-full md:float-left flex justify-center md:px-6 md:py-3 py-4 md:text-sm text-base md:rounded-3xl rounded-none text-center">

          {label}

        </Link>
      </div>
    );
  }
}

function createText(text) {
  if (text) {
    return <p className="typ-p text-gray-dark">{text}</p>;
  }
}
