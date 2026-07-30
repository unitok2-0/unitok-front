import Link from "next/link"

export default function BtnFixedMobile(props) {
    return (
        <div className='md:relative fixed md:w-auto w-full bottom-0 left-0 z-40'>
            <Link
                href={props.link}
                target={`${(props.externo) ? '_blank':''}`}
                className='btn md:w-auto w-full md:float-left flex justify-center md:px-7 md:py-3.5 py-4 md:text-base text-base md:rounded-3xl rounded-none text-center'>
                {props.label}
            </Link>
        </div>
    );
}