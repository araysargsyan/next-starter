import axios from "axios";

export abstract class BaseService {
    protected axios = (() => {
        axios.defaults.withCredentials = true;
        axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
        return axios
    })();
}