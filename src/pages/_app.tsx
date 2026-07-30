// import 'styles/font-face.css'
import 'styles/index.css'
import 'components/Modals/MainModal/styles.css'
import 'nprogress/nprogress.css'
import Head from 'next/head'

import { useEffect, useState } from 'react'
import { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '../contexts/AuthContext'
import { CartProvider } from 'contexts/CartContext'
import { CheckoutProvider } from 'contexts/CheckoutContext'
import { AuthConarhProvider } from '../contexts/AuthConarhContext';
import { GlobalStyle } from '../styles/Global'
import { Theme } from '../styles/Theme'
import Router, { useRouter } from 'next/router'
import nProgress from 'nprogress'
import { hotjar } from 'react-hotjar'
import TagManager from 'react-gtm-module'

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PwaRange from 'components/PwaRange'
import { PetProvider } from 'contexts/PetContext'
import { ProfileProvider } from 'contexts/ProfileContext'

nProgress.configure({ showSpinner: false })

Router.events.on('routeChangeStart', nProgress.start)
Router.events.on('routeChangeComplete', nProgress.done)
Router.events.on('routeChangeError', nProgress.done)

const reCaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY

/** This is meant to be temporary, the best thing is to wrap the whole app, but it has some concerns */
function ReCaptchaProviderOrFragment(props: { children: React.ReactNode }) {
  const router = useRouter()
  const isPaymentPage = router.asPath === '/checkout/payment'

  if (isPaymentPage) {
    return (
      <GoogleReCaptchaProvider reCaptchaKey={reCaptchaKey}>
        {props.children}
      </GoogleReCaptchaProvider>
    )
  }

  return <>{props.children}</>
}

function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: any, cards: any }>) {
  useEffect(() => {
    ; () => {
      Router.events.off('routeChangeStart', nProgress.start)
      Router.events.off('routeChangeComplete', nProgress.done)
      Router.events.off('routeChangeError', nProgress.done)
    }
  }, [])

  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-KK5MGP5' });
  }, [])

  useEffect(() => {
    hotjar.initialize(Number(process.env.NEXT_PUBLIC_HOTJAR_ID), Number(process.env.NEXT_PUBLIC_HOTJAR_SV))
  }, [])

  const [queryClient] = useState(() => new QueryClient());

  return (
    <AuthProvider>
      <AuthConarhProvider>
        <PetProvider>
          <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={pageProps.dehydratedState}>
              <CartProvider cards={pageProps.cards}>
                <CheckoutProvider>
                  <ProfileProvider>
                    <ReCaptchaProviderOrFragment>
                      <Theme>
                        <GlobalStyle />
                        <ToastContainer />
                        <PwaRange />
                        <Head>
                          <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                          />
                        </Head>
                        <Component {...pageProps} />
                      </Theme>
                    </ReCaptchaProviderOrFragment>
                  </ProfileProvider>
                </CheckoutProvider>
              </CartProvider>
            </HydrationBoundary>
          </QueryClientProvider>
        </PetProvider>
      </AuthConarhProvider>
    </AuthProvider>
  )
}

export default MyApp
