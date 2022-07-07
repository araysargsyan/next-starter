import {FC, ReactElement, useEffect} from "react";
import NavBar from "@NavBar";
import Head from "next/head";
import {IHeadProps} from "types/global";


const MainLayout: FC<{ children: ReactElement<{ head?: IHeadProps }> }> = ({children: mainContent}) => {
    const headProps = mainContent.props.head;

    useEffect(() => {
        console.log("RENDER: MainLayout", mainContent)
    })

    return (
        <>
            {headProps && <Head>
                <title>{headProps.title}</title>
                <meta name="description" content={headProps.description}/>
            </Head>}
            <NavBar />
            <main>{mainContent}</main>
{/*            <main>{loading ? "LOADING" : mainContent}</main>
            <h1>{JSON.stringify({isAuth, isProtectedRoute, loading})}</h1>*/}
        </>
    );
}

export default MainLayout;