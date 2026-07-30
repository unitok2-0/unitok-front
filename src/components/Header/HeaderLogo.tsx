import Link from 'next/link'

const image = {
  src: '/assets/logo.svg',
  alt: 'Logo icon',
}

type HeaderLogo = {
  widthLogo?: string
  heightLogo?: string
}

export function HeaderLogo({ widthLogo = '4.5rem', heightLogo = '3rem' }) {
  return (
    (<Link href="/" passHref>

      <img
        src={image.src}
        alt={image.alt}
        style={{ width: widthLogo, height: heightLogo }}
        color="pink"
      />

    </Link>)
  );
}
