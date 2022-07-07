import {GetStaticProps, InferGetStaticPropsType, NextPage} from "next";
import {useEffect} from "react";
import Link from "next/link";

export const getStaticProps: GetStaticProps<{ posts: Array<{id: number, title: string}> }> = async () => {
    return {
        props: {
            posts: [{id: 1, title: "post title"}]
        }
    }
}


const Post: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({posts}) => {
    useEffect(() => {
        console.log('RENDER: Post')
    })

    return (
        <div>
            <h1>POST</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <Link
                            href={{
                                pathname: '/post/[id]',
                                query: {id: post.id}
                            }}
                        >
                            <a>{post.title}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}


export default Post;