import { Html, Head, Main, NextScript } from "next/document";
import { fontSans } from "@/lib/fonts";

export default function Document() {
  return (
    <Html lang="en" className={fontSans.variable}>
      <Head />
      <body className="min-h-screen bg-background font-sans antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
