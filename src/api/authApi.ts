import http from "../modules/http";
import { Indexed } from "../utils/helpers";

export class AuthAPI {
    protected http: typeof http;

    constructor() {
        this.http = http;
    }

    signin(data: Indexed) {
        return this.http.post('/auth/signin', { data });
    }

    signup(data: Indexed) {
        return this.http.post('/auth/signup', { data });
    }

    read() {
        return this.http.get('/auth/user');
    }

    logout() {
        return this.http.post('/auth/logout');
    }
}

export default new AuthAPI();
