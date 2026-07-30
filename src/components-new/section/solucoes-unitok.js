import CardGreen from "../card/card-green";
import Container from "../layout/container";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef, useEffect } from "react";
import { isImageExist } from "../helpers/check-image";

export default function SolucoesUnitok(props) {
  const box = useRef();
  const title = useRef();
  const text = useRef();


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const animation = () => {
      setTimeout(() => {
        gsap.from(title.current, {
          y: 20,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          autoAlpha: 0,
          scrollTrigger: {
            trigger: box.current,
            start: "top 30%",
          },
        });

        gsap.from(text.current, {
          y: 20,
          opacity: 0,
          duration: 1.2,
          delay: 0.1,
          ease: "power3.out",
          autoAlpha: 0,
          scrollTrigger: {
            trigger: box.current,
            start: "top 30%",
          },
        });

        gsap.from(".box-list-itens .item", {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: 0.1,
          ease: "power3.out",
          autoAlpha: 0,
          scrollTrigger: {
            trigger: box.current,
            start: "top 30%",
          },
          stagger: 0.16,
        });
      }, 1400);
    }
  }, []);

  return (
    <section ref={box} className="md:py-24 py-14 bg-green-dark">
      <Container>
        <div className="text-center mb-24">
          <h2 ref={title} className="typ-text-2 text-green-light mb-6">
            Outras soluções Unitok
          </h2>
          <p ref={text} className="typ-p text-white font-light">
            Receba comissões pela venda de dispositivos e também das outras
            soluções Unitok.
          </p>
        </div>
        <div className="box-list-itens flex mb:flex-nowrap flex-wrap mb:gap-x-2 mb:gap-y-0 gap-8 justify-center">
          {
            props.list.map((item) => {
              return (
                <div className="item mb:w-4/12 md:w-5/12 w-full">
                  <CardGreen
                    icon={isImageExist(item.Icone)}
                    iconHover={isImageExist(item.IconeHover)}
                    title={item.Titulo}
                    link={item.Link ? item.Link : '#'}
                  />
                </div>
              )
            })
          }
        </div>
      </Container>
    </section>
  );
}

const keyframes = {
  headingV2: ({ section, container }) => ({
    [section.topAt("container-bottom")]: {
      translateY: 50,
      opacity: 0,
    },
    [section.topAt("container-top") - container.height / 4]: {
      translateX: 0,
    },
    [section.bottomAt("container-top")]: {
      translateY: 0,
      opacity: 1,
    },
  }),
  itens: {
    [0]: {
      translateY: 50,
      opacity: 0,
    },
    [400]: {
      translateY: 0,
      opacity: 1,
    },
  },
};
