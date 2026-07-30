import Link from "next/link";
import Container from "./container";
import Image from "next/image";
import { useState } from "react";

export default function Header(props) {
  const colorFont = changeColorWhite(props);
  const colorIcon = changeColorIcon(props);
  const colorIconMobile = changeColorIconMobile(props);
  const [menuEmpresa, setMenuEmpresa] = useState(false);
  const [menuMobile, setmenuMobile] = useState(false);
  const openMenu = () => {
    setmenuMobile(true);
  };

  return (
    <header className="header py-5 md:pt-12 md:pb-12 2xl:px-24 md:z-10 z-50 w-full md:relative absolute top-0">
      <Container>
        <div className="flex justify-between">
          <figure className="mb-0 flex items-center">
            <Link href="/" className="hidden md:block xl:w-auto w-44">

              <Image
                src="/public-new/icons/layout/header/logo.svg"
                width={202}
                height={34}
              />

            </Link>
            <Link href="/" className="flex md:hidden xl:w-auto w-44">

              <Image
                src="/public-new/icons/layout/header/logo-m.svg"
                width={78}
                height={20}
              />

            </Link>
          </figure>
          <nav className="hidden md:flex items-center xl:gap-x-12 gap-x-6">
            {/* <Link href="/customizados">
              <a className={`header-nav-link ${colorFont}`}>Identificadores</a>
            </Link> */}
            <div className={`dropdown header-nav-link relative  ${colorFont}`}>
              <Link href="/empresas" className="lg:flex hidden items-center cursor-pointer">
                Empresas<figure className="ml-1.5">
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.7992 1.6001L5.99921 6.40009L1.19922 1.6001"
                      stroke={colorIcon}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </figure>

              </Link>
              <ul className="dropdown-list absolute pt-4 top-2 w-40 text-xs gap-y-2 flex flex-col mt-2 opacity-0 transition-all">
                <li>
                  <Link href="/customizados" className="hover:underline">
                    Com a sua marca
                  </Link>
                </li>
                <li>
                  <Link href="/lojas" className="hover:underline">
                    Para pdv
                  </Link>
                </li>
                <li>
                  <Link href="/eventos" className="hover:underline">
                    Para eventos
                  </Link>
                </li>
              </ul>
            </div>
            <Link href="/tags" className={`header-nav-link ${colorFont}`}>
              Tags
            </Link>
            <Link href="/cartao-visita" className={`header-nav-link ${colorFont}`}>
              Cartões
            </Link>
            <Link href="/suporte" className={`header-nav-link tb:flex hidden ${colorFont}`}>
              
                Suporte
              
            </Link>
          </nav>
          <div className="flex justify-end items-center gap-x-2">
            <Link
              href="https://api.whatsapp.com/send?phone=5508004550800"
              target="_blank"
              className="btn hidden md:block">
              
                Pedir orçamento
              
            </Link>
            <button className="block md:hidden" onClick={openMenu}>
              <a
                className={`w-10 h-10 rounded-full xl:flex md:hidden flex items-center justify-center transition-all  ${
                  props.headerWhite
                    ? "hover:bg-orange hover:bg-opacity-40"
                    : "hover:bg-gray-mid"
                }`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12H20"
                    stroke={colorIconMobile}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 6H20"
                    stroke={colorIconMobile}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 18L20 18"
                    stroke={colorIconMobile}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </button>
            <Link
              href="/login"
              className={`w-10 h-10 rounded-full xl:flex flex items-center justify-center transition-all  ${
                props.headerWhite
                  ? "hover:bg-orange hover:bg-opacity-40"
                  : "hover:bg-gray-mid"
              }`}>

              <svg
                className="desktop hidden md:block"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21.0002C21 19.9393 20.5259 17.9217 19.682 17.1716C18.8381 16.4214 17.6935 16 16.5 16H7.5C6.30653 16 5.16193 16.4214 4.31802 17.1716C3.47411 17.9217 3 19.9393 3 21.0002"
                  stroke={colorIcon}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 10.7614 9.23858 13 12 13Z"
                  stroke={colorIcon}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                className="mobile block md:hidden"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21.0002C21 19.9393 20.5259 17.9217 19.682 17.1716C18.8381 16.4214 17.6935 16 16.5 16H7.5C6.30653 16 5.16193 16.4214 4.31802 17.1716C3.47411 17.9217 3 19.9393 3 21.0002"
                  stroke={colorIconMobile}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 10.7614 9.23858 13 12 13Z"
                  stroke={colorIconMobile}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

            </Link>
          </div>
        </div>
      </Container>
      <div
        className={`${
          menuMobile ? "w-10/12 px-5" : "w-0"
        } menu-mobile bg-orange drop-shadow-3xl  h-full md:hidden flex flex-col items-start fixed top-0 left-0 py-5  transition-all ease-in-out duration-150 overflow-hidden`}
      >
        <button
          className="flex justify-start mb-12"
          onClick={() => setmenuMobile(false)}
        >
          <figure className="flex p-2">
            <Image
              src="/public-new/icons/layout/header/menu-close.svg"
              width={20}
              height={20}
            />
          </figure>
        </button>
        <nav className="h-full">
          <ul className="flex flex-col h-full gap-y-6">
            <li>
              <Link href="/tags" className="header-nav-link-mobile text-white">
                Tags
              </Link>
            </li>
            <li>
              <Link href="/cartao-visita" className="header-nav-link-mobile text-white">
                Cartões
              </Link>
            </li>
            <li>
              <button
                className="flex items-center"
                onClick={() => setMenuEmpresa(!menuEmpresa)}
              >
                <a className="header-nav-link-mobile text-white">Empresas</a>
                <figure
                  className={`ml-3 transition-all ease-out duration-200 ${
                    menuEmpresa ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    width="18"
                    height="12"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.7992 1.6001L5.99921 6.40009L1.19922 1.6001"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </figure>
              </button>
              {menuEmpresa && (
                <ul className="transition-all duration-200 ease-out">
                  <li className="py-2">
                    <Link
                      href="/customizados"
                      className="header-nav-link-mobile text-sm text-white">
                      
                        Com a sua marca
                      
                    </Link>
                  </li>
                  <li className="py-2">
                    <Link href="/lojas" className="header-nav-link-mobile text-sm text-white">
                      
                        Para pdv
                      
                    </Link>
                  </li>
                  <li className="py-2">
                    <Link href="/eventos" className="header-nav-link-mobile text-sm text-white">
                      
                        Para eventos
                      
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link href="/suporte" className="header-nav-link-mobile text-white">
                Ajuda
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function changeBodyOverflow(status) {
  const body = document.querySelector("#__next > .h-screen");
  if (!status) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "auto";
  }
}

function changeColorWhite(type) {
  if (type.headerWhite == true) {
    return "text-white";
  }
}

function changeColorIcon(type) {
  if (type.headerWhite == true) {
    return "#ffff";
  }
  return "#646464";
}

function changeColorIconMobile(type) {
  if (type.mobileIconsColors == "orange") {
    return "#FF4C1C";
  } else if (type.mobileIconsColors == "white") {
    return "#FFF";
  }
  return "#646464";
}
