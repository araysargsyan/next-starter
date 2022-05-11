import type {AppProps} from 'next/app'
import '../styles/globals.scss'
import MainLayout from "../components/layouts/MainLayout";
import {NextPageWithLayout} from "../types/global";

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function App({Component, pageProps}: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>)

    return getLayout(<Component {...pageProps} />)
}