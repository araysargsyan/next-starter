import {FC, ReactNode} from "react";

const AnotherLayout: FC<{children: ReactNode}> = ({children}) => {
    return (
        <div>
            <h1>AnotherLayout</h1>
            <main>{children}</main>
        </div>
    );
}

export default AnotherLayout;