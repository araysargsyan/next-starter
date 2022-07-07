import {GetStaticProps, NextPage} from "next";
import useComponentDidUpdate from "../../hooks/useComponentDidUpdate";
import {useEffect, useState} from "react";

const Make: NextPage = () => {
    useComponentDidUpdate("RENDER: Make.scss");
    const [counter, setCounter] = useState<{count: number; direction: string | null}>({
        count: 1,
        direction: null
    });
    const slider = ['type', 'kind', 'details']
    const {count, direction} = counter;
    const cakeConfig = new Map();
    const cakeTypes = [{name: 'type1', prise: 0, size: 0}]
    const changeCount = (dir: 'LEFT' | 'RIGHT') => {
        let nextCount = dir === 'RIGHT' ? count + 1 : count - 1;
        if (nextCount > slider.length) {
            nextCount = 1;
        } else if (nextCount === 0) {
            nextCount = slider.length;
        }
        setCounter({
            count: nextCount,
            direction: dir.toLowerCase()
        });
    }
    cakeConfig.set({type: 'type1'}, {prise: 0, size: 0})

    return (
        <div>
            <h1>make</h1>
            <div className="counter-wrap">
                <div className="counter">
                    <button onClick={() => changeCount('LEFT')}>{"<"}</button>
                    <div
                        key={count}
                        data-content={slider[count - 1]}
                        className={'counter-value' + (direction ? ' ' + direction : '')}
                    />
                    <button onClick={() => changeCount('RIGHT')}>{">"}</button>
                </div>
                <div className="counter-dots">
                    {slider.map((slide) => <div
                        key={slide}
                        className={slide === slider[count - 1] ? 'dot fill': 'dot'}
                    />)}
                </div>
            </div>
        </div>
    )
}

export default Make;

export const getStaticProps: GetStaticProps<{}> = async (context) => {
    console.log('make getStaticProps', context)
    return {
        props: {}
    };
}
