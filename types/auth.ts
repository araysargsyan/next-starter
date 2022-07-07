import {GetServerSideProps} from "next";
import {IAuthState} from "../store/auth";
import {GetServerSidePropsResult} from "next/types";

export enum EAuthCookie {
    ACCESS = 'accessToken',
    REFRESH = 'refreshToken',
    IS_REDIRECTED = 'isRedirected',
}

export interface ITokens {
    [EAuthCookie.ACCESS]?: string
    [EAuthCookie.REFRESH]?: string
}

export type TGetServerSidePropsPrivateResult = GetServerSidePropsResult<{ auth?: Pick<IAuthState, 'isAuth' | 'user'> } | {}>
export type TGetServerSidePropsPrivate<T = unknown> = GetServerSideProps<{ auth?: Pick<IAuthState, 'isAuth' | 'user'> } & T>

export const IS_REDIRECTED = EAuthCookie.IS_REDIRECTED as const;