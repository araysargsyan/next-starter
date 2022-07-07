import {ServerResponse} from "http";

export function setCookie(res: ServerResponse, cookies: string | string[]) {
    const setCookie = typeof cookies === 'string' ? [cookies] : cookies;
    const incomingCookies = res.getHeader('set-cookie');
    const incomingSetCookie = Array.isArray(incomingCookies) ? incomingCookies : incomingCookies ? [incomingCookies as string] : [];

    res.setHeader("set-cookie", [...incomingSetCookie, ...setCookie])
}