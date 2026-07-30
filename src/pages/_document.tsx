import React from 'react'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'
export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang='pt_BR'>
        <Head>

          <meta property="og:title" content="Unitok" />
          <meta property="og:description" content="Cartão de visita digital, todas as formas de contato com você em um único lugar" />
          <meta property="og:image" content="https://www.unitok.com/assets/Unitok_share-Thumb.png" />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="800" />
          <meta property="og:image:height" content="600" />
          <meta property="og:type" content="website" />
          <meta property="og:type" content="article" />
          <meta property="article:author" content="Unitok" />
          <meta property="article:published_time" content="date_time" />
          <meta property="o</meta>g:locale" content="pt_BR" />
          <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
          {/* PWA */}
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='application-name' content='Unitok' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-title' content='Unitok' />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#ffffff" />


          <meta name="description" content="Cartão de visita digital, todas as formas de contato com você em um único lugar" />
          <link
            rel="preload"
            href="/fonts/GT-Maru-Light.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/GT-Maru-Medium.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/GT-Maru-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/favicon.ico" />

          <script
            dangerouslySetInnerHTML={{
              __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '451145639812257');
              fbq('track', 'PageView');`,
            }}
          />          
          
          <script
            dangerouslySetInnerHTML={{
              __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '367740112095561');
            fbq('track', 'PageView');
            `
            }}
          />

          <meta
            name="facebook-domain-verification"
            content="ila7c1agvgr1pt02ril1i0w5adi6vi"
          />

          {/* FACEBOOK TAG MANAGER */}

          <script dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KV6PLPX');
            `
          }}></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
