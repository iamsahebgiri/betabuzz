import { Html, Head, Main, NextScript } from "next/document";
import { fontSans } from "@/lib/fonts";

export default function Document() {
  return (
    <Html lang="en" className={fontSans.variable}>
      <Head />
      <body className="bg-background min-h-screen antialiased font-sans">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
