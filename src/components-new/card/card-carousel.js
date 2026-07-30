/* eslint-disable react-hooks/rules-of-hooks */
import Markdown from "markdown-to-jsx";
import Image from "next/image";
import { useState } from "react";

export default function CardCarousel(props) {
  const color = changeColorCard(props);
  const classeComponent =
    "component-card-carousel w-full px-8 py-10 rounded " +
    color +
    " " +
    props.cssClass;

  const textBlock = () => {
    const [limit, setLimit] = useState(props.item.text.length > 180 ? 1 : 0);
    const [extra, setExtra] = useState(0);

    const handleClick = () => {
      setExtra((extra) => !extra);
    };

    return (
      <article
        className={`scroll-bar-custom md:text-xs text-sm md:leading-6 leading-7  mt-6 max-h-36  ${
          extra ? "overflow-y-scroll" : "overflow-hidden"
        }`}
      >
        {limit ? (
          <p>
            {extra
              ? <Markdown>{props.item.text}</Markdown>
              : <Markdown>{props.item.text.substring(0, 150) + "..."}</Markdown>
            }
            <span
              className="text-orange md:text-xs text-sm font-bold ml-2 underline cursor-pointer"
              onClick={() => handleClick()}
            >
              {extra ? "ver menos" : "ver mais"}
            </span>
          </p>
        ) : (
          <p><Markdown>{props.item.text}</Markdown></p>
        )}
      </article>
    );
  };

  return (
    <div className={`${classeComponent}  min-h-[300px]`}>
      <div className="flex justify-start items-center">
        {props.item.icon && (
          <div className="w-2/12 flex justify-start items-center">
            <figure className="flex">
              <picture className="flex">
                <Image src={props.item.icon} width={36} height={36} />
              </picture>
            </figure>
          </div>
        )}
        <h3
          className={` ${
            props.item.icon ? "w-10/12 pl-4" : "w-full"
          }  typ-p text-orange font-bold min-h-[36px] flex items-center`}
        >
          {props.item.title}
        </h3>
      </div>

      {textBlock()}
    </div>
  );
}

function changeColorCard(classe) {
  if (classe.item.icon) {
    if (classe.bgWhite) {
      return "bg-white text-gray-dark";
    }
    return "bg-gray-mid text-gray-dark";
  }
  return "bg-green-dark text-white";
}
