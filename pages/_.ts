import {IS_REDIRECTED, TGetServerSidePropsPrivate} from "../types/auth";
import privateRoute from "../util/privateRoute";
import {setCookie} from "../util/setCookie";

const Navigator = () => null;

export const getServerSideProps: TGetServerSidePropsPrivate = async ({req, res, params, query}) => {
    console.log('______________________', query[IS_REDIRECTED], req.cookies[IS_REDIRECTED])


    // if(!req.cookies[IS_REDIRECTED]) {
    //     setCookie(res, [`${IS_REDIRECTED}=false; Path=/; HttpOnly`])
    // }
    const redirectTo = `/${query[IS_REDIRECTED]}` as string || false;
    const result = await privateRoute(req.cookies, req.headers.cookie, res, redirectTo);

    console.log({result})
    return result || {notFound: true};
}

export default Navigator;