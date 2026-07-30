import Link from "next/link";

export default function Btn(props) {

  return <>
    <Link href={props.link} target={`${(props.externo) ? '_blank' : ''}`}>

      <button
        className={`btn-default bg-orange px-7 py-4 rounded-3xl text-white text-center leading-none text-base transition-all hover:bg-btn-hover ${props.cssClass}`}
      >
        {props.label}
      </button>

    </Link>
  </>;
}