import {NextResponse, NextMiddleware} from "next/server"
import {IS_REDIRECTED} from "../types/auth";
import getArrayFromEnumValues from "../util/getArrayFromEnumValues";
import {EStaticProtectedRoutes} from "../types/config";

const middleware: NextMiddleware = async function middleware(req, event) {
    if (req.page.name) {
        const staticProtectedRoutes = getArrayFromEnumValues(EStaticProtectedRoutes);
        const isStaticProtectedRoute = staticProtectedRoutes.includes(req.page.name);
        const mustGoToStaticPage = staticProtectedRoutes.includes('/' + req.url.split(`/_?${IS_REDIRECTED}=`)[1])
        const mustRedirect = req.url.includes(`?${IS_REDIRECTED}=true`)
        //const isRedirected = isStaticProtectedRoute && (req.cookies[IS_REDIRECTED] === 'false' || !req.url.includes('?a=a')) /*req.url.includes(`?${IS_REDIRECTED}=false`)*/
        const isRedirected = req.cookies[IS_REDIRECTED] === 'false';
        console.log(666, {
            referer: req.headers.get('referer'),
            url: req.url,
            cookie: req.cookies,
            a: req.headers.get('set-cookie'),
            b: NextResponse.next().headers.get('set-cookie'),
            origin: req.nextUrl.origin,
            pageName: req.page.name,
            isStaticProtectedRoute,
            mustRedirect,
            isRedirected,
        })

        let res = undefined;


        if (!isRedirected) {
            console.log('____________!isRedirected')
            if (isStaticProtectedRoute) {
                console.log('____________isStaticProtectedRoute')
                res = NextResponse.redirect(`${req.nextUrl.origin}/_?${IS_REDIRECTED}=${req.page.name.slice(1)}`)

                if (mustRedirect) {
                    console.log('____________mustRedirect')
                    res.cookie(IS_REDIRECTED, "false", {httpOnly: false, path: '/'})
                }
            } else if (mustGoToStaticPage) {
                console.log('____________mustGoToStaticPage')
                res = NextResponse.next()
                    .cookie(IS_REDIRECTED, "false", {httpOnly: false, path: '/'})
            }
        } else /*if (!isStaticProtectedRoute)*/ {
            //console.log('____________!isStaticProtectedRoute')
            console.log('____________isRedirected')
            //res = NextResponse.next()
                //.clearCookie(IS_REDIRECTED)
                //.cookie(IS_REDIRECTED, "false", {httpOnly: true, path: '/', maxAge: 0})
        }

        // if (isStaticProtectedRoute) {
        //     console.log('IS_STATIC_PAGE............')
        //     if (mustRedirect) {
        //         console.log('IS_STATIC_PAGE_CHECKED_AND_REDIRECTED............')
        //         res = NextResponse.redirect(`${req.nextUrl.origin}/_?${IS_REDIRECTED}=${req.page.name.slice(1)}`)
        //             .cookie(IS_REDIRECTED, "false", {httpOnly: true, path: '/'})
        //     } else {
        //         console.log('IS_STATIC_PAGE_REDIRECT_TO__............')
        //         res = NextResponse.next().clearCookie(IS_REDIRECTED)
        //     }
        // } else if (req.page.name === '/_') {
        //     console.log('IS_______________________________')
        //     res = NextResponse.next()
        //         .cookie(IS_REDIRECTED, "false", {httpOnly: true, path: '/'})
        // }

        return res;

    }

}

export default middleware;