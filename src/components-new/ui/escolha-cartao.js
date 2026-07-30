import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Btn from "./btn";
import { isImageExist } from "../../components-new/helpers/check-image";

export default function EscolhaCartao(props) {

  const colors = props.data.Itens;
  const [count, setCount] = useState(1);
  const [btnCta, setBtnCta] = useState(props.data.BotaoExterno ? props.data.BotaoExterno : false);
  const [color, setColor] = useState(props.data.Itens[0] ? props.data.Itens[0].Cor : null);
  const [img, setImg] = useState(props.data.Itens[0] ? props.data.Itens[0]?.Imagem.url : null);

  const setNumber = (num) => {
    if (count + num >= 1) {
      setCount(count + num);
    }
  };

  function triggerColor(cor) {
    setColor(cor);
    const corItem = colors.filter((colors) => {
      return colors.Cor === cor;
    });
    setImg(corItem[0]?.Imagem.url);
  }

  const listColorsOptions = (list) => {
    return list.map((item, i) => {
      if (item.Cor) {
        return (
          <div
            key={i}
            className={` ${
              color == item.Cor ? "border-orange" : "border-gray-light"
            } border-2  rounded-full flex justify-center items-center p-0.5 cursor-pointer`}
            onClick={() => triggerColor(item.Cor)}
          >
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: item.Cor }}
            ></span>
          </div>
        );
      } else {
        return (
          <div
            key={i}
            className={`border-2  rounded-full flex justify-center items-center p-0.5 cursor-pointer opacity-0 mb-4`}
          ></div>
        );
      }
    });
  };

  const countBlock = () => {
    return (
      <div className="flex justify-center mt-10 gap-x-3">
        <div className="bg-white rounded-full flex items-center px-2 py-1">
          <button
            onClick={() => setNumber(-1)}
            className={`border-2 border-orange text-orange font-normal text-2xl leading-none flex justify-center items-center w-7 h-7 transition-all rounded-full pb-0.5 ${
              count > 1 ? "opacity-100" : "opacity-40 cursor-not-allowed"
            }`}
          >
            <span>-</span>
          </button>
          <span className="w-10 text-center font-bold text-base">{count}</span>
          <button
            onClick={() => setNumber(1)}
            className="border-2 border-orange text-orange font-normal text-2xl leading-none flex justify-center items-center w-7 h-7 rounded-full pb-1"
          >
            <span>+</span>
          </button>
        </div>
        <Link
          href={props.data.BotaoLinkComprar ? props.data.BotaoLinkComprar : '#'}
          className="btn"
          target="_blank">
          
            Comprar
          
        </Link>
      </div>
    );
  };

  return (
    <div className="component-escolha-tag w-full max-w-[650px] bg-gray-light rounded-md px-6 py-4">
      <figure className="w-full  flex justify-center items-center -mt-16 mb-3">
        <picture className="drop-shadow-3xl w-full max-w-[230px]">
          <Image
            src={img}
            width={230}
            height={162}
            quality={100}
            layout="responsive"
          />
        </picture>
      </figure>

      <div className="flex justify-center gap-x-1">
        {listColorsOptions(props.data.Itens)}
      </div>

      <article className="text-center mt-4">
        <h4 className="text-lg text-green-black font-bold">
          {props.data.Nome}
        </h4>
        <p className="text-lg text-green-black font-light">
          {props.data.Valor}
        </p>
      </article>

      {!btnCta ? (
        countBlock()
      ) : (
        <div className="flex justify-center mt-10">
          <Btn label={btnCta.Legenda} link={btnCta.Link} />
        </div>
      )}
    </div>
  );
}
