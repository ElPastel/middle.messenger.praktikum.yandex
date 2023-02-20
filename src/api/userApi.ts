import { Indexed } from "../utils/helpers";
import BaseAPI from "./baseApi";

export class UserAPI extends BaseAPI {
    constructor() {
        super();
    }

    changeProfile(data: Indexed) {
        return this.http.put('/user/profile', {data});
    }

    changePassword(data: Indexed) {
        return this.http.put('/user/password', {data});
    }

    changeAvatar(data: Indexed) {
        return this.http.put('/user/profile/avatar', {data});
    }

    userByLogin(data: Indexed) {      
        return this.http.post('/user/search', {data});
    }

    create = undefined;
    read = undefined;
    update = undefined;
    delete = undefined;
}

export default new UserAPI();
