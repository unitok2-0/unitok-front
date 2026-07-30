import Image from 'next/image'
import Markdown from "markdown-to-jsx";

export default function CardSimple(props) {
    if (props.image) {
        return (
            <div className="component-card-simple w-full">
                <figure className='mb-6 w-full rounded overflow-hidden bg-white' style={{ position: 'relative', width: '100%', height: '220px' }}>
                    <Image src={props.image} layout="fill" objectFit='cover' />
                </figure>
                <article className='typ-p leading-6 text-gray-dark'>
                    <Markdown>{props.text}</Markdown>
                </article>
            </div>
        )
    }
    return ''
}
