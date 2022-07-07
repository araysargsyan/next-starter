import {FC, ReactElement} from "react";

const AnotherLayout: FC<{children: ReactElement}> = ({children}) => {
    return (
        <div>
            <h1>AnotherLayout</h1>
            <main>{children}</main>
        </div>
    );
}

export default AnotherLayout;