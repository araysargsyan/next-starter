import {MouseEventHandler} from "react";

const usePreventDefaultNavigation = (path: string = '/'): MouseEventHandler<HTMLAnchorElement> => {
    return (e) => {
        if (window.location.pathname === path) {
            e.preventDefault()
        }
        return;
    }
}

export default usePreventDefaultNavigation;