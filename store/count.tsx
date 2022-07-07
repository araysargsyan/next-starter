import {createContext, FC, ReactNode, useContext, useReducer} from "react";
import {IAction} from "../types/core";

//Initial State and Actions
const initialState = {
    count: 0
};

enum EActions {
    INCREMENT = "INCREMENT",
};

interface ICountContext {
    state: typeof initialState;
    dispatch: (action: EActions, payload?: any) => void;
}

const reducer = (state: typeof initialState, action: IAction<keyof typeof EActions>) => {
    switch (action.type) {
        case EActions.INCREMENT:
            return {
                ...state,
                count: ++state.count
            };
        default:
            return state;
    }
};

const Context = createContext<ICountContext | null>(null);
const CountProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const value = {
        state,
        dispatch: (action, payload) => {
            dispatch({ type: action, payload });
        },
    } as ICountContext;

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};
const useCount = () => useContext(Context) as ICountContext;
const countActions = EActions;

export {CountProvider, useCount, countActions }