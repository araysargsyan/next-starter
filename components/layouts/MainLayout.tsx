import {FC, ReactNode} from "react";

const MainLayout: FC<{children: ReactNode}> = ({children}) => {
    return (
        <div>
            <h1>MainLayout</h1>
            <main>{children}</main>
        </div>
    );
}

export default MainLayout;