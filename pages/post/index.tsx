import {GetStaticProps, InferGetStaticPropsType, NextPage} from "next";
import {useEffect} from "react";
import Link from "next/link";

interface IPost {
    id: number;
    title: string;
    body: string;
}

export const getStaticProps: GetStaticProps<{ posts: IPost[] }> = async (context) => {
    const posts = await (await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')).json() as IPost[];

    return {
        props: {
            posts
        }
    }
}

const Post: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({posts = []}) => {

    useEffect(() => {
        console.log('Post')
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
                                query: {
                                    id: post.id
                                }
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


export default Post