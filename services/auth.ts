import {IUser} from "../store/auth";
import {ServerResponse} from "http";
import {ITokens} from "../types/auth";
import {BaseService} from "./baseService";
import {setCookie} from "../util/setCookie";

export class AuthService extends BaseService {

    async signIn(data: ISignInData): Promise<IUser | void> {
        try {
            const response = await this.axios.post<IAuthResponse>("auth/sign-in", data)

            if (response.status === 200) {
                return response.data.user;
            }
        } catch (e) {
            console.log('SERVICE-signIn', e)
        }

    }

    async logout(): Promise<true | void> {
        try {
            const response = await this.axios.get("auth/logout")

            if (response.status === 200) {
                return true;
            }
        } catch (e) {
            console.log('SERVICE-logout', e)
        }
    }

    async refresh(cookie: string, res: ServerResponse): Promise<IUser | void> {
        try {
            const response = await this.axios.get<IAuthResponse>("auth/refresh", {
                headers: {cookie}
            })

            if (response.status === 200) {
                console.log(response.headers["set-cookie"], 222222)
                setCookie(res, response.headers["set-cookie"] || [])
                return response.data.user;
            }
        } catch (e: any) {
            console.log('SERVICE-refresh', e.data.status)
        }
    }

    async me(cookie: string): Promise<IUser | void> {
        try {
            const response = await this.axios.get<IUser>("auth/me", {
                headers: {cookie}
            })

            if (response.status === 200) {
                return response.data;
            }
        } catch (e) {
            console.log('SERVICE-me', e)
        }
    }
}

export interface ISignInData {
    email: string;
    password: string;
}

interface ISignUpData extends ISignInData {
    passwordConfirm: string;
}

interface IAuthResponse {
    user: IUser;
    tokens: ITokens;
}