import {ServerResponse} from "http";
import {authService} from "../services";
import {EAuthCookie, ITokens, IS_REDIRECTED, TGetServerSidePropsPrivateResult} from "../types/auth";
import {ERoutes} from "../types/config";
import {IUser} from "../store/auth";
import {setCookie} from "./setCookie";

export default async function privateRoute(
    cookies: ITokens & Record<string, string>,
    cookie: string = "",
    res: ServerResponse,
    redirectTo: string | boolean = true
): Promise<TGetServerSidePropsPrivateResult | void> {
    const mustRedirected = typeof redirectTo === 'string';
    const {accessToken, refreshToken} = cookies
    console.log({
        ...cookies, cookie, redirectTo, mustRedirected
    })
    if (!redirectTo) {
        console.log(4545454)
        return {
            notFound: true
        }
    }

    function _getOptions(user: IUser): TGetServerSidePropsPrivateResult {
        if (mustRedirected) {
            return {
                redirect: {
                    permanent: true,
                    destination: redirectTo
                    //destination: `${redirectTo}?${IS_REDIRECTED}=false`
                }
            }
        } else {
            return {
                props: {
                    auth: {
                        user,
                        isAuth: true
                    }
                }
            }
        }
    }

    if (accessToken) {
        try {
            const user = await authService.me(cookie);

            if (user) {
                //console.log(user.exp - user.iat)
                return _getOptions(user);
            }
        } catch (e: any) {
            console.log(e.data.status);
            // result.props.auth = {
            //     error: e.response.data.message
            // };
        }

    } else if (!accessToken && refreshToken) {
        const user = await authService.refresh(cookie, res);

        if (user) {
            return _getOptions(user);
        }
    } else if (!refreshToken) {
        //accessToken && setCookie(res, [`${EAuthCookie.ACCESS}=deleted; Max-Age=0; Path=/; HttpOnly;`])

        return {
            redirect: {
                permanent: true,
                destination: ERoutes.SIGN_IN
            }
        }
    } else {
        return {
            notFound: true
        }
    }
}