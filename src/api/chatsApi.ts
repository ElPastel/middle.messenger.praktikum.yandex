import BaseAPI from "./baseApi";
import { Indexed } from "../utils/helpers";

export class ChatsAPI extends BaseAPI {
    constructor() {
        super();
    }

    getChats(data: Indexed) {
        return this.http.get('/chats', { data })
    }

    createChat(data: Indexed) {
        return this.http.post('/chats', { data })
    }

    deleteChat(data: Indexed) {
        return this.http.delete('/chats', { data })
    }

    getUsersByChatId(chatId: number, data: Indexed) {
        return this.http.get(`/chats/${chatId}/users`, { data })
    }

    getUnreadCount(data: Indexed) {
        return this.http.get(`/chats/new/${data.id}`, { data })
    }

    changeChatAvatar(data: Indexed) {
        return this.http.put('/chats/avatar', { data, headers: {} })
    }

    addUsersToChat(data: Indexed) {
        return this.http.put('/chats/users', { data })
    }

    deleteUsersFromChat(data: Indexed) {
        return this.http.delete('/chats/users', { data })
    }

    getToken(chatId: number) {
        return this.http.post(`/chats/token/${chatId}`)
    }

    create = undefined;
    read = undefined;
    update = undefined;
    delete = undefined;
}

export default new ChatsAPI();
