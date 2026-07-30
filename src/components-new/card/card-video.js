import Image from 'next/image'
import Markdown from "markdown-to-jsx";

export default function CardVideo(props) {
    if (props.video) {
        return (
            <div className="w-full">
                <video 
                    className='mb-6 overflow-hidden bg-white rounded text-center flex-1 md:h-[257px] h-[190px] object-cover' 
                    controls
                >
                    <source src={props.video}/>
                </video>
            </div>
        )
    }
    return ''
}
