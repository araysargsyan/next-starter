import {FC, MouseEvent, useEffect} from "react";
import style from "@styles/Menu.module.scss";
import Link from "next/link";
import {TMenuItems} from "@NavBar";

export interface IMenuProps {
    items: TMenuItems
}

const Menu: FC<IMenuProps> = ({items}) => {
    // const r = useRouter();
    // console.log(r)
    useEffect(() => {
        console.log("RENDER: Menu")
    })

    function handleLinkClick(e: MouseEvent<HTMLAnchorElement>, cb: () => void) {
        e.preventDefault();
        cb();
    }

    return (
        <ul className={style.menu}>
            {items.map(({name, href}) => (
                <li
                    className={style.li}
                    key={name}
                >
                    {typeof href === "function" 
                        ? <a
                            className="link"
                            onClick={(e) => handleLinkClick(e, href)}
                        >
                            {name}
                        </a>
                        : <Link href={href}>
                            <a>{name}</a>
                        </Link>}
                </li>
            ))}
        </ul>
    );
};

export default Menu;