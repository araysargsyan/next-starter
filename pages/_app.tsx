import 'styles/index.scss';
import 'styles/components/Menu.scss';

import {useEffect} from "react";
import Layout from "@layouts";
import {AuthProvider, IAuthProviderProps} from "../store/auth";
import {TAppPropsWithLayout} from "../types/core";
import {CountProvider} from "../store/count";
import useComponentDidUpdate from "../hooks/useComponentDidUpdate";
import {IS_REDIRECTED} from "../types/auth";
import removeCookie from "../util/removeCookie";


function App({Component, pageProps, router: {route}}: TAppPropsWithLayout) {
    let payload: IAuthProviderProps['payload'] = {}
    if (Object.keys(pageProps.auth || {}).length) {
        payload = pageProps.auth;
    }

    useEffect(() => {
        document.cookie.includes(IS_REDIRECTED) && removeCookie(IS_REDIRECTED)
    }, [pageProps])

    useComponentDidUpdate("RENDER: _APP")

    return (
        <AuthProvider payload={payload}>
            <CountProvider>
                <Layout
                    Component={Component}
                    pageProps={pageProps}
                    //route={route}
                />
            </CountProvider>
        </AuthProvider>
    );
}

export default App;

