import Image from 'next/image'
import Link from 'next/link'
import { useState } from "react";

export default function CardGreen(data) {

    const [hover, setHover] = useState(0)

    return (
        <div className="component-card-green rounded bg-green-dark border border-green-black p-8 hover:bg-green-light transition-all"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <Link href={data.link}>

                <figure className='mb-16 mt-3'>
                    {(() => {
                        if (data.icon && data.iconHover) {
                            return (
                                hover ? (
                                    <Image src={data.iconHover} width={48} height={48} />
                                ) : (
                                    <Image src={data.icon} width={48} height={48} />
                                )
                            )
                        } else {
                            return (
                                <div></div>
                            )
                        }
                    })()}
                </figure>
                <h3 className={`mb:text-3xl text-2xl font-light mb-6 transition-all ${(hover) ? 'text-green-dark' : 'text-green-light'}`}>{data.title}</h3>
                <div className='flex justify-start'>
                    <div className={`text-base font-bold flex items-center transition-al ${(hover) ? 'text-orange' : 'text-white'}`} >
                        <span className={`border-b  ${(hover) ? 'border-orange' : 'border-white'}`}>Saiba mais</span>
                        <figure className={`mt-1.5 transition-all ${(hover) ? 'ml-6' : 'ml-3'}`}>
                            <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.39844 0.799979L8.59842 7.99996L1.39844 15.2" stroke={`${(hover) ? '#FF4C1C' : 'white'}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </figure>
                    </div>
                </div>

            </Link>
        </div>
    );
}
