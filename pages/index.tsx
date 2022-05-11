import styles from '../styles/pages/Home.module.scss'
import {ReactElement} from "react";
import AnotherLayout from "../components/layouts/AnotherLayout";
import {NextPageWithLayout} from "../types/global";

const Home: NextPageWithLayout = () => {
    return (
        <div className={styles.container}>
            <h1>NEXT</h1>

            <style jsx>{`
              h1 {
                color: #78ee6b;
              }

              .link {
                text-decoration: none;
                color: #349bac;
              }
            `}</style>
        </div>
    )
}

Home.getLayout = (page: ReactElement) => {
    return (
        <AnotherLayout>{page}</AnotherLayout>
    )
}

export default Home
