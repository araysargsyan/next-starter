import styles from '@styles/Home.module.scss'
import {NextPageWithLayout} from "types/global";
import {useAuth} from "../store/auth";
import privateRoute from "../util/privateRoute";
import {countActions, useCount} from "../store/count";
import useComponentDidUpdate from "../hooks/useComponentDidUpdate";
import { TGetServerSidePropsPrivate } from "../types/auth";

const Home: NextPageWithLayout = () => {
    const {state: {user}} = useAuth()
    const {dispatch, state} = useCount()

    useComponentDidUpdate("RENDER: Home", user)

    return (
        <div className={styles.container}>
            <h1>NEXT</h1>
            <h2>{`${user?.id}: ${user?.email}`}</h2>
            <h3>{state.count}</h3>
            <button onClick={() => dispatch(countActions.INCREMENT)}>aaa</button>

            <style jsx>{`
              h1 {
                color: #78ee6b;
              }
              
              h2 {
                font-size: 40px;
              }

              .link {
                text-decoration: none;
                color: #349bac;
              }
            `}</style>
        </div>
    )
}

export const getServerSideProps: TGetServerSidePropsPrivate = async ({req, res}) => {
    console.log(res.getHeaders(), req.headers)
    const result = await privateRoute(req.cookies, req.headers.cookie, res);

    return result || {notFound: true};
}

// Home.getLayout = (page) => {
//     return <LayoutContainer
//         Layout={AnotherLayout}
//         page={page}
//     />
// }

export default Home
