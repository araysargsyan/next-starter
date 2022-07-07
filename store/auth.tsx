import {
    createContext,
    useContext,
    FC,
    ReactNode,
    useEffect,
    useReducer, Dispatch
} from "react";
import {IAction} from "../types/core";
import {useRouter} from "next/router";
import {ERoutes} from "../types/config";
import {ISignInData} from "../services/auth";
import {authService} from "../services";
import useComponentDidUpdate from "../hooks/useComponentDidUpdate";

export interface IUser {
    id: number;
    email: string;
    iat: number;
    exp: number;
}

export interface IAuthState {
    isAuth: boolean;
    user: IUser | null;
    error: string;
}
export interface IAuthProviderProps {
    payload: Partial<IAuthState>;
    children: ReactNode
}
interface IAuthContext {
    state: typeof initialState;
    dispatch: (actionType: EActions, payload?: any) => Promise<void> | void;
}

enum EActions {
    SIGN_IN = "SIGN_IN",
    LOGOUT = "LOGOUT",
    SET_AUTH = "SET_AUTH",
    _REMOVE_USER = "_REMOVE_USER",
    _SET_USER = "_SET_USER"
}

const initialState = {
    isAuth: false,
    user: null,
    error: ""
} as IAuthState

const reducer = (state: IAuthState, {payload, type}: IAction<keyof typeof EActions>) => {
    switch (type) {
        case EActions.SET_AUTH:
            return {
                ...state,
                isAuth: payload
            }
        case EActions._SET_USER:
            return {
                ...state,
                user: payload,
                isAuth: Boolean(payload)
            }
        case EActions._REMOVE_USER:
            return {
                ...state,
                user: null,
                isAuth: false
            }
        default:
            return state;
    }
};


const signIn = async (dispatch: Dispatch<IAction<keyof typeof EActions>>, data: ISignInData) => {
    const payload = await authService.signIn(data)
    payload && dispatch({type: EActions._SET_USER, payload})
}

const logout = async (dispatch: Dispatch<IAction<keyof typeof EActions>>) => {
    (await authService.logout()) && dispatch({type: EActions._REMOVE_USER});
}

const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider: FC<IAuthProviderProps> = ({payload, children}) => {
    const [state, dispatcher] = useReducer(reducer, initialState);
    const {push} = useRouter();

    useComponentDidUpdate('RENDER: AuthProvider')

    useEffect(() => {
        // if (document.cookie.includes(EAuthCookie.AUTHORIZED)) {
        //     console.log(2525)
        //     //removeCookie(EAuthCookie.AUTHORIZED)
        //     !state.isAuth && dispatcher({type: authActions.SET_AUTH, payload: true})
        // }
    })

    const store = {
        state: {
            ...state,
            ...payload
        },
        dispatch: async (actionType, payload?) => {
            switch (actionType) {
                case EActions.SIGN_IN:
                    await signIn(dispatcher, payload);
                    // await sleep(2000)
                    await push(ERoutes.HOME);
                    break;
                case EActions.LOGOUT:
                    await logout(dispatcher);
                    await push(ERoutes.SIGN_IN);
                    break;
                default:
                    dispatcher({type: actionType, payload});
            }
        },
    } as IAuthContext;

    return (
        <AuthContext.Provider value={store}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext) as IAuthContext;
const authActions = EActions;

export {AuthProvider, useAuth, authActions}