import http from "../modules/http/http";
import { Indexed } from "../utils/helpers";

export class UserAPI {
    protected http: typeof http;
    constructor() {
        this.http = http;
    }

    changeProfile(data: Indexed) {
        return this.http.put('/user/profile', { data });
    }

    changePassword(data: Indexed) {
        return this.http.put('/user/password', { data });
    }

    changeAvatar(data: Indexed) {
        return this.http.put('/user/profile/avatar', { data });
    }

    userByLogin(data: Indexed): Promise<any> {
        return this.http.post('/user/search', { data });
    }
}

export default new UserAPI();
