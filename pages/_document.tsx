// #region Global Imports
import * as React from 'react';
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';
// #endregion Global Imports

class WebAppDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="shortcut icon"
            href={`${process.env.NEXT_PUBLIC_ASSETS_URL}/static/favicon.png`}
          />
          {/* <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          /> */}
          <link
            href={`${process.env.NEXT_PUBLIC_ASSETS_URL}/static/normalize.css`}
            rel="stylesheet"
          />

          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />

          <link
            rel="manifest"
            href={`${process.env.NEXT_PUBLIC_ASSETS_URL}/static/manifest.json`}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <noscript>You need to enable JavaScript to run this app.</noscript>
        </body>
      </Html>
    );
  }
}

export default WebAppDocument;
