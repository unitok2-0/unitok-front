import Head from 'next/head'
import { useEffect } from 'react'
import { Container } from '../../styles/pageStyles/tag/styles'


export default function Tag() {

  useEffect(() => {
    document.querySelector('body').style.overflow = 'hidden';
  }, [])

  return (
    <>
      <Head>
        <title>Tag | Unitok</title>
      </Head>
      <Container>
        <iframe src="http://unitok.ubpages.com/tag/" frameBorder="0"></iframe>
      </Container>
    </>
  )
}