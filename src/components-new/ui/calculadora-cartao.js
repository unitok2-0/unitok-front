import Image from "next/image";
import { useState } from "react";

export default function CalculadorCartao() {
  const [cartoes, setCartoes] = useState(1);
  const [valor, setValor] = useState(calcValor(cartoes));
  const [arvore, setArvore] = useState(0);

  function handleChange() {
    let cartao = 1;
    cartao = event.target.value - 1;

    if (cartao <= 0) {
      cartao = 1;
    }

    if (cartao > 20 && cartao < 60) {
      setArvore(1);
    } else if (cartao >= 60 && cartao < 90) {
      setArvore(2);
    } else if (cartao >= 90) {
      setArvore(3);
    } else {
      setArvore(0);
    }

    setCartoes(cartao);
    setValor(calcValor(cartao));
  }

  function calcValor(cartao) {
    return (cartao * 6500).toLocaleString();
  }

  return (
    <div className={`calculadora-cartao `}>
      <div className="flex w-full justify-center">
        <h5 className="text-xs text-green-dark uppercase">Arraste a bolinha</h5>
      </div>
      <div className="flex my-8 relative">
        <progress
          className="absolute bottom-5 w-full h-1.5 left-0 block z-0 rounded-lg appearance-none"
          value={cartoes}
          max="100"
        >
          10
        </progress>
        <input
          className="slider-input block z-10 mb-6 w-full h-0 bg-transparent rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          min={1}
          max={101}
          step={10}
          value={cartoes}
          onChange={(e) => handleChange(e)}
          type="range"
        />
      </div>
      <div className="flex md:flex-row flex-col items-center  justify-between mt-10 relative">
        <div className="md:w-2/12 w-full flex flex-row items-center justify-start md:mb-0 mb-8">
          <figure className="w-full flex justify-start">
            <picture className="w-full max-w-[96px]">
              <Image
                src="/public-new/img/cartao-visita/img4.png"
                width={96}
                height={61}
                quality={100}
                layout={"responsive"}
              />
            </picture>
          </figure>
          <h3 className="w-full text-3xl font-bold text-orange pl-4">
            <small>X</small> {cartoes}
          </h3>
        </div>
        <div className="md:w-1/12 w-full md:flex hidden justify-end">
          <span className="text-3xl text-green-dark font-bold">=</span>
        </div>
        <div className="md:w-9/12 w-full flex justify-end">
          <h3 className="md:text-3xl text-2xlMax md:leading-normal leading-tight text-green-dark font-light">
            Você economiza <strong className="font-bold">{valor}</strong>{" "}
            cartões de papel
          </h3>
        </div>

        {arvore ? (
          <figure className="absolute md:-bottom-24 md:-right-24 -bottom-24 right-0">
            <picture className="w-[115px] relative">
              <Image
                src="/public-new/icons/cartao-visita/selo1.svg"
                width={126}
                height={126}
                quality={100}
              />
              <span className="absolute text-xxs text-white bottom-8 left-0 right-0 w-full text-center leading-normal">
                E salva
                <br />
                {arvore ? arvore : ""} {arvore == 1 ? "árvore" : "árvores"}
              </span>
            </picture>
          </figure>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
