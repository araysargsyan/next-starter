import {FC, useMemo} from "react";
import {ILayoutContainerProps, IMemorizedLayoutProps, TAppPropsWithLayout} from "types/core";
import MainLayout from "@layouts/MainLayout";

const MemorizedLayout: FC<IMemorizedLayoutProps> = ({route, children: page}) => {
    return useMemo(() => {
        console.log("__RERENDER__");
        return page;
    }, [route]);
}

export const LayoutContainer: FC<ILayoutContainerProps> = ({route = null, page, Layout}) => (
    route === null
        ? <Layout>{page}</Layout>
        : <MemorizedLayout route={route}>
            <Layout>{page}</Layout>
        </MemorizedLayout>
)

const Layout: FC<{Component: TAppPropsWithLayout['Component'], pageProps: TAppPropsWithLayout['pageProps'], route?: string}> = ({Component, pageProps, route}) => {
    const getLayout = Component.getLayout ?? ((page) => {
        return <LayoutContainer
            route={route}
            Layout={MainLayout}
            page={page}
        />
    })

    return getLayout(<Component {...pageProps}/>)
}

export default Layout;