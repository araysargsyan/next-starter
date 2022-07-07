import {AppProps} from "next/app";
import {FC, ReactElement} from "react";
import {NextPageWithLayout} from "./global";

export type TAppPropsWithLayout = AppProps & {
    //? pageProps: {auth?: IAuthControllerArgs},
    Component: NextPageWithLayout,
}

export interface ILayoutContainerProps {
    page: ReactElement;
    Layout: FC<{ children: ReactElement }>;
    route?: string | null;
}

export interface IMemorizedLayoutProps {
    route: string;
    children: ILayoutContainerProps['page'];
}

export interface IAction<T extends string = string> {
    type: T,
    payload?: any
}