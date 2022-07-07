import {InferGetStaticPropsType, NextPage} from "next";
import {useEffect} from "react";
import { TGetStaticPropsSEO } from "types/global";
import useComponentDidUpdate from "../../hooks/useComponentDidUpdate";

const Portfolio: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({head}) => {
    useComponentDidUpdate("RENDER: Portfolio")

    return (
        <>
            <div>
                <h1>Portfolio</h1>
            </div>
        </>
    )
}


export const getStaticProps: TGetStaticPropsSEO = async (context) => {
    return {
        props: {
            head: {
                title: 'Portfolio',
                description: 'portfolio description'
            }
        }
    }
}

export default Portfolio;

