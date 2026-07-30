import Image from "next/image";

export default function VideoTutorial() {
  return (
    <a href="https://www.youtube.com/watch?v=TpUT4UYYjHw" target="_blank" rel="noreferrer" >
      <div
        className={`w-auto bg-white rounded flex items -center justify-center pt-6 px-4 py-1 gap-x-4 relative`}
      >
        <figure className="absolute -top-4 left-4">
          <Image
            src="/public-new/icons/home/iconPlay.svg"
            width={48}
            height={48}
            quality={100}
            alt="Imagem"
          ></Image>
        </figure>
        <span className="w-auto text-orange text-sm font-bold pt-4">
          Ainda em dúvida?
          <br /> Assista ao vídeo.
        </span>
        <figure className="w-auto">
          <Image
            src="/public-new/img/home/video.jpg"
            width={96}
            height={67}
            quality={100}
            alt="Imagem"
          ></Image>
        </figure>
      </div>
    </a>
  );
}
