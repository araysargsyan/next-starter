import {GetServerSideProps, GetStaticProps, NextPage} from "next";
import {ReactElement} from "react";

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactElement
}

export interface IHeadProps {
    title: string,
    description: string
}

export type TGetStaticPropsSEO<T = unknown> = GetStaticProps<{ head: IHeadProps } & T>
export type TGetServerSidePropsSEO<T = unknown> = GetServerSideProps<{ head: IHeadProps } & T>