import { Indexed } from "../utils/helpers";
import http from "../modules/http";

export class ChatsAPI {
    protected http: typeof http;
    constructor() {
        this.http = http;
    }

    getChats(data: Indexed) {
        return this.http.get('/chats', { data })
    }

    createChat(data: Indexed) {
        return this.http.post('/chats', { data })
    }

    deleteChat(data: Indexed): Promise<unknown> {
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

    async getToken(chatId: number): Promise<string> {
        const response = await this.http.post(`/chats/token/${chatId}`) as {token: string};
        return response.token;
    }
}

export default new ChatsAPI();
