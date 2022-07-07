export default function removeCookie(cookieName?: string) {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = (eqPos > -1 ? cookie.substr(0, eqPos) : cookie).trim();
        if (cookieName && cookieName === name) {
            document.cookie = `${name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
            break;
        }
        document.cookie = `${name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
}