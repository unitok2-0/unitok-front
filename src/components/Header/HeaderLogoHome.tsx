import Link from 'next/link'

const image = {
  src: '/assets/unitok_logos-institucional.svg',
  alt: 'Logo icon',
}

type HeaderLogoHome = {
  widthLogo?: string
  heightLogo?: string
}

export function HeaderLogoHome({ widthLogo = '8.4rem', heightLogo = '3rem' }) {
  return (
    (<Link href="/" passHref>

      <img
        src={image.src}
        alt={image.alt}
        style={{
          width: widthLogo,
          height: heightLogo,
          transform: 'translateY(2px)',
        }}
        color="pink"
      />

    </Link>)
  );
}
