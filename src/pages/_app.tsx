import axios from "axios"
import { NextPage } from "next"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import { ReactElement, ReactNode, useState } from "react"
import { IntlProvider } from "react-intl"
import Modal from "react-modal"
import { Hydrate, QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { ToastContainer } from "react-toastify"

import "rc-tooltip/assets/bootstrap.css"
import "react-dropdown/style.css"
import "react-toastify/dist/ReactToastify.css"

import DefaultLayout from "@layouts/Default"

import { AuthProvider } from "@services/Auth"
import { ModalManagerProvider } from "@services/ModalManager"

import { __PROD__ } from "@utils/env"

import English from "@public/locales/en.json"

import "../styles/globals.css"

Modal.setAppElement("#__next")

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
axios.defaults.withCredentials = true

// ! THIS REMOVES API ERRORS FROM CONSOLE LOG
// ! THIS IS TEMPORARY AND NOT MEANT FOR PRODUCTION
if (!__PROD__) {
  axios.interceptors.response.use(
    (r) => r,
    (e) => {},
  )
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout }

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient())
  const { locale = "en" } = useRouter()

  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <IntlProvider locale={locale} messages={English}>
          <AuthProvider>
            <ModalManagerProvider>
              <>{getLayout(<Component {...pageProps} />)}</>
            </ModalManagerProvider>
          </AuthProvider>

          <ToastContainer
            closeButton={false}
            hideProgressBar
            position="bottom-center"
            autoClose={2500}
            className="w-[328px]"
            toastClassName="bg-[#070B14] font-normal text-sm text-white tracking-[0.15px] min-h-min shadow-toast"
            bodyClassName="px-2"
            theme="dark"
          />
        </IntlProvider>

        <ReactQueryDevtools initialIsOpen={false} position="top-right" />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default CustomApp
