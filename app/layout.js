import { Nunito } from "next/font/google"
import "./globals.css"

export const metadata = {
  title: "Digital E-Commerce",
  description: "Digital e-commerce platform with retro theme",
}

const MyAppFont = Nunito({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={ false }>
      <body cz-shortcut-listen="false" className={ MyAppFont.className }>
        { children }
      </body>
    </html>
  )
}
