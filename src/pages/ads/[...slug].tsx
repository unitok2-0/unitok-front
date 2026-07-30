import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { Container } from '../../styles/pageStyles/ads/styles'
import { getBrandProduct } from "services/brands";
import Link from "next/link";


interface ProductOfBrandProps {
  brand: {
    brand_name: string;
    product_name: string;
    video_url: string;
  }
}

export default function ProductOfBrand({ brand }: ProductOfBrandProps) {
  return <>
    <Head>
      <title>{brand.brand_name} | Unitok</title>
    </Head>
    <Container>
      <h2 className="brand-name">{brand.brand_name}</h2>
      <h3 className="product-name">{brand.product_name}</h3>

      <div className="video-container">
        <iframe
          src={brand.video_url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen>
        </iframe>
      </div>


      <footer>
        <Link href='/'>

          <img src="/assets/powered-by-unitok.svg" alt="Unitok" />

        </Link>
      </footer>

    </Container>
  </>;
}


export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {

  const brand = query.slug[0]
  const product = query.slug[1]

  const brandInfos = await getBrandProduct(String(brand));

  if (!brandInfos) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    }
  }
  const selectedProduct = brandInfos.products.find(item => item.name === String(product));

  function youtube_parser(url: string) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    const urlId = (match && match[7].length == 11) ? match[7] : false;
    return `https://www.youtube.com/embed/${urlId}`
  }

  const formatedProduct = {
    brand_name: brandInfos.brand_name.replace(/-/g, ' '),
    product_name: selectedProduct.name.replace(/-/g, ' '),
    video_url: youtube_parser(selectedProduct.video_url)
  }

  return {
    props: {
      brand: formatedProduct
    }
  }
};
