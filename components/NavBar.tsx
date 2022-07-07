import {FC, memo, useEffect} from 'react';
import Link, { LinkProps } from "next/link";
import styleVars from "/styles/variables.module.scss";
import style from "/styles/components/NavBar.module.scss";
import usePreventDefaultNavigation from "../hooks/usePreventDefaultNavigation";
import Menu from "@Menu";
import {Logo} from "@svg";
import {useAuth, authActions} from "../store/auth";
import {ERoutes, EStaticProtectedRoutes} from "../types/config";
import useStaticNavigate from 'hooks/useStaticNavigate';

interface IMenuItem extends LinkProps {
    name: string;
}

export type TMenuItems = Array<IMenuItem | {name: string, href: () => void}>

const NavBar: FC = () => {
    const {state: {isAuth}, dispatch} = useAuth()
    const navigate = useStaticNavigate()

    useEffect(() => {
        console.log("RENDER: NavBar", isAuth)
    })

    const menuItems: TMenuItems = [
        {name: "Make", href: () => navigate(EStaticProtectedRoutes.MAKE)},
        {name: "Portfolio", href: () => navigate(EStaticProtectedRoutes.PORTFOLIO)},
        {name: "Post", href: "/post"}
    ];

    menuItems.push(
        isAuth
            ? {name: "Logout", href: () => dispatch(authActions.LOGOUT)}
            : {name: "Login", href: ERoutes.SIGN_IN}
    )

    return (
        <>
            <nav className={style.nav}>
                <Link href="/">
                    <a className="svg__link" onClick={usePreventDefaultNavigation('/')}>
                        <Logo width="7rem" fill={styleVars.cAccent} />
                    </a>
                </Link>
                <Menu items={menuItems}/>
            </nav>
        </>
    );
};

//export default memo(NavBar);
export default NavBar;