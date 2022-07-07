import {GetStaticProps, NextPage} from "next";
import {authActions, useAuth} from "../../store/auth";
import useComponentDidUpdate from "../../hooks/useComponentDidUpdate";

const SignIn: NextPage = () => {
    const {dispatch, state} = useAuth()

    useComponentDidUpdate("RENDER: SignIn", state)

    return <>
        <h1>{state.error}</h1>
        <button
            style={{float: "right"}}
            onClick={() => dispatch(authActions.SIGN_IN, {email: 'asdsdssssass', password: 'asassas'})}
        >
            Sign in
        </button>
    </>
}

export default SignIn;

export const getStaticProps: GetStaticProps<any> = async (context) => {
    return {
        props: {}
    };
}