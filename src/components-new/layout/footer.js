import Link from "next/link";
import Container from "./container";
import Image from "next/image";
import AcessarConta from "./acessar-conta";

export default function Footer() {
  return (
    <footer className="bg-green-dark md:py-14 md:pb-14 py-12 px-1 pb-20">
      <div className="bg-gray-300">
        <Container>
          <div className="row-1 flex md:flex-row flex-col justify-start">
            <figure className="md:w-3/12 w-full mb-0 flex items-center">
              <Image
                src="/public-new/icons/layout/footer/logo.svg"
                width={130}
                height={22}
              />
            </figure>

            <div className="mb:w-3/12 w-4/12 md:flex hidden pl-8">
              <AcessarConta></AcessarConta>
            </div>
          </div>
          <div className="row-2 flex md:flex-row flex-col justify-start md:my-9 my-6 gap-y-9">
            <div className="md:w-3/12 w-full text-white text-xs leading-relaxed">
              <p className="md:mb-10 mb-5 font-light">
                Unitok Sistemas LTDA.
                <br />
                CNPJ 45.340.462/0001-96
              </p>
            </div>
            <div className="md:w-3/12 w-full flex flex-col md:gap-y-4 gap-y-3 md:pl-8">
              <Link href="/quem-somos" className="footer-nav-link w-full">
                Quem somos
              </Link>
              <Link href="/termos-e-condicoes" className="footer-nav-link w-full">
                Termos de Uso
              </Link>
              <Link href="/politica-de-privacidade" className="footer-nav-link w-full">
                
                  Política de Privacidade
                
              </Link>
              <Link href="/reembolso-e-trocas" className="footer-nav-link w-full">
                Garantias e trocas
              </Link>
              <Link href="/suporte" className="footer-nav-link w-full">
                Suporte
              </Link>
            </div>
            <div className="md:w-3/12 w-full flex flex-col md:gap-y-4 gap-y-3 xl:pl-16 md:pl-8">
            </div>
            <div className="md:w-3/12 w-full text-white text-xs leading-relaxed font-light xl:pl-24 md:pl-8">
              <div className="md:hidden flex mb-7">
                <AcessarConta></AcessarConta>
              </div>
              <h6 className="text-base text-green-light font-bold mb-3">
                Horários de atendimento
              </h6>
              <p>
                Humano:
                <br />
                Segunda a sexta, das 8h às 18h
              </p>
              <div className="flex items-center mb-2 mt-4">
                <figure className="mb-0 flex items-center mr-3 min-w-[24px]">
                  <Image
                    src="/public-new/icons/layout/footer/whatsapp.svg"
                    width={24}
                    height={24}
                  />
                </figure>
                <Link
                  href="https://api.whatsapp.com/send?phone=5508004550800"
                  target="_blank"
                  className="typ-p-sm font-normal hover:underline">
                  
                    0800 455 0800
                  
                </Link>
              </div>
              <div className="flex items-center mb-2">
                <figure className="mb-0 flex items-center mr-3 min-w-[24px]">
                  <Image
                    src='/public-new/icons/layout/footer/phone.svg'
                    width={18}
                    height={18}
                  />
                </figure>
                <Link
                  href='https://api.whatsapp.com/send?phone=5508004550800'
                  target='_blank'
                  className='typ-p-sm font-normal hover:underline'>
                  
                    0800 455 0800
                  
                </Link>
              </div>
              <div className='flex items-center'>
                <figure className='mb-0 flex items-center mr-3 min-w-[24px]'>
                  <Image
                    src='/public-new/icons/layout/footer/email.svg'
                    width={24}
                    height={24}
                  />
                </figure>
                <Link
                  href="mailto:contato@unitok.com"
                  className="typ-p-sm font-normal hover:underline">
                  
                    contato@unitok.com
                  
                </Link>
              </div>
            </div>
          </div>
          <div className="row-3 flex md:flex-row flex-col-reverse justify-start">
            <div className="md:w-3/12 w-full text-green-light text-xs font-light leading-relaxed flex items-end">
              <p>
                © Unitok 2023.
                <br />
                Todos os direitos reservados.
              </p>
            </div>
            <div className="md:w-3/12 w-full flex items-center md:pl-8 md:mb-0 mb-7">
              <figure className="mb-0 flex items-center mr-3">
                <Image
                  className="rounded-sm"
                  src="/public-new/icons/layout/footer/reclameaqui.jpg"
                  width={96}
                  height={33}
                />
              </figure>
            </div>
            <div className="md:w-3/12 w-full xl:pl-16 md:pl-8 md:mb-0 mb-7">
              <h6 className="text-base text-green-light font-bold mb-3">
                Formas de pagamento
              </h6>
              <div className="flex flex-wrap justify-start gap-2 w-[200px]">
                <figure className="mb-0 flex items-center">
                  <Image
                    className="rounded-sm"
                    src="/public-new/icons/layout/footer/forma1.svg"
                    width={35}
                    height={25}
                  />
                </figure>
                <figure className="mb-0 flex items-center">
                  <Image
                    className="rounded-sm"
                    src="/public-new/icons/layout/footer/forma2.svg"
                    width={35}
                    height={25}
                  />
                </figure>
                <figure className="mb-0 flex items-center">
                  <Image
                    className="rounded-sm"
                    src="/public-new/icons/layout/footer/forma3.svg"
                    width={35}
                    height={25}
                  />
                </figure>
                <figure className="mb-0 flex items-center">
                  <Image
                    className="rounded-sm"
                    src="/public-new/icons/layout/footer/forma4.svg"
                    width={35}
                    height={25}
                  />
                </figure>
                <figure className="mb-0 flex items-center">
                  <Image
                    className="rounded-sm"
                    src="/public-new/icons/layout/footer/forma5.svg"
                    width={35}
                    height={25}
                  />
                </figure>
                <figure className="mb-0 flex items-center">
                  <Image
                    className="rounded-sm"
                    src="/public-new/icons/layout/footer/forma6.svg"
                    width={35}
                    height={25}
                  />
                </figure>
                <figure className="mb-0 flex items-center">
                  <Image
                    className="rounded-sm"
                    src="/public-new/icons/layout/footer/forma7.svg"
                    width={35}
                    height={25}
                  />
                </figure>
                <figure className="mb-0 flex items-center">
                  <Image
                    className="rounded-sm"
                    src="/public-new/icons/layout/footer/forma8.svg"
                    width={35}
                    height={25}
                  />
                </figure>
              </div>
            </div>
            <div className="md:w-3/12 w-full flex items-center xl:pl-24 md:pl-8 md:mb-0 mb-7">
              <div className="flex gap-x-4 ">
                <a href="https://www.instagram.com/unitok_br" target="_blank" rel="noreferrer">
                  <figure className="mb-0 flex items-center min-w-[24px]">
                    <Image
                      className="rounded-sm"
                      src="/public-new/icons/layout/footer/midia1.svg"
                      width={24}
                      height={24}
                    />
                  </figure>
                </a>
                <a
                  href="https://www.youtube.com/channel/UCmLVukDcy1WsiMNry_nNR6g/featured"
                  target="_blank" rel="noreferrer"
                >
                  <figure className="mb-0 flex items-center min-w-[24px]">
                    <Image
                      className="rounded-sm"
                      src="/public-new/icons/layout/footer/midia2.svg"
                      width={24}
                      height={24}
                    />
                  </figure>
                </a>
                <a href="https://www.tiktok.com/@unitok_br" target="_blank" rel="noreferrer">
                  <figure className="mb-0 flex items-center min-w-[24px]">
                    <Image
                      className="rounded-sm"
                      src="/public-new/icons/layout/footer/midia3.svg"
                      width={24}
                      height={24}
                    />
                  </figure>
                </a>
                <a
                  href="https://www.linkedin.com/company/unitok"
                  target="_blank" rel="noreferrer"
                >
                  <figure className="mb-0 flex items-center min-w-[24px]">
                    <Image
                      className="rounded-sm"
                      src="/public-new/icons/layout/footer/midia4.svg"
                      width={24}
                      height={24}
                    />
                  </figure>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
