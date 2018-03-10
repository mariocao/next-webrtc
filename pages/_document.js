import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet, injectGlobal } from "styled-components";

// const GA_TRACKING_ID = "UA-XXX"
// Modify script in the head
{
  /*
    <script src={"/static/curl.min.js"} />
    <script
    async
    src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
    />
    <script
        dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)};
            gtag('js', new Date());
            // gtag('config', '${GA_TRACKING_ID}');
            `
        }}
    /> 
*/
}

export default class MyDocument extends Document {
  render() {
    const sheet = new ServerStyleSheet();
    const main = sheet.collectStyles(<Main />);
    const styleTags = sheet.getStyleElement();
    return (
      <html>
        <Head>
          <title>Next WebRTC</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)};
                gtag('js', new Date());
              `
            }}
          />
          <link rel="icon" type="image/png" href="/static/favicon.ico" />
          {styleTags}
        </Head>
        <body>
          <div className="root">{main}</div>
          <NextScript />
        </body>
      </html>
    );
  }
}

injectGlobal`
  body {
    margin: 0 auto;
    font-family: avenir;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
  }
`;
