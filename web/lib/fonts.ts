import { JetBrains_Mono as FontMono, Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"

export const fontSans = localFont({
  src: "./../fonts/Satoshi-Variable.woff2",
  variable: "--font-sans",
})

// export const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// })

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})
