import {NextPage} from "next";
import {NextRouter, useRouter} from "next/router";
import {useEffect} from "react";

interface IPostQuery extends NextRouter {
    query: {
        id: string
    }
}

const PostItem: NextPage = () => {
    const {query: {id}} = useRouter() as IPostQuery;
    useEffect(() => {
        console.log('PostItem', {id})
    })
    return (
        <div>
            <h1>{id}</h1>
        </div>
    )
}

export default PostItem;