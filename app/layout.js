import "./globals.css"
import { Funnel_Display } from 'next/font/google'
import Provider from "./provider"
import { ClerkProvider } from "@clerk/nextjs"

export const metadata = {
  title: "Digital E-Commerce",
  description: "A retro theme based website is for purchasing and selling digital products.",
}

const AppFont = Funnel_Display({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={ false }>
        <body cz-shortcut-listen="false" className={ AppFont.className }>
          <Provider>
            { children }
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  )
}
