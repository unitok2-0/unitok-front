import Image from "next/image";
import { useImageFallback } from "../../hooks/useImageFallback";

export default function GalleryImage({ src, ...rest }) {
  const resolvedSrc = useImageFallback(src);
  return <Image src={resolvedSrc} {...rest} />;
}
