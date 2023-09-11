import { ReactElement, ReactNode } from 'react'
import * as React from "react"
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { RouteGuard } from '@/components/routeguard'
import Head from 'next/head'
import { NextUIProvider } from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
      <NextUIProvider>
        <NextThemesProvider attribute='class' defaultTheme='dark'>
          <Head>
            <meta name='author' content='Nightstuck' />
          </Head>
          <RouteGuard>
            <Component {...pageProps} />
          </RouteGuard>
        </NextThemesProvider>
      </NextUIProvider>
      )
}
