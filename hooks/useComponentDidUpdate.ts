import {useEffect} from "react";

export default function useComponentDidUpdate(...args: any[]) {
    useEffect(() => {
        console.log(...args)
    })
}