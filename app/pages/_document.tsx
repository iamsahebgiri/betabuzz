import { Html, Head, Main, NextScript } from "next/document";
import { fontSans } from "@/lib/fonts";

export default function Document() {
  return (
    <Html lang="en" className={fontSans.variable}>
      <Head>
        <meta name="referrer" content="no-referrer" />
      </Head>
      <body className="bg-background min-h-screen font-sans antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
