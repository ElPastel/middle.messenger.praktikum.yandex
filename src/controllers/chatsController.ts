import chatsApi, { ChatsAPI } from "../api/chatsApi";
import store from "../modules/store";

import { Indexed } from "../utils/helpers";

export class ChatsController {
    private readonly api: ChatsAPI;

    constructor() {
        this.api = chatsApi;
    }

    async getChats(data: Indexed) {
        try {
            const chats = await this.api.getChats(data);
            store.set('chats', chats);
        } catch (e: any) {
            console.error(e);
        }
    }

    async createChat(data: Indexed) {
        try {
            const chats = await this.api.createChat(data);
            store.set('chats', chats);
        } catch (e: any) {
            console.error(e);
        }
    }

    async deleteChat(data: Indexed) {
        try {
            const chats = await this.api.deleteChat(data);
            store.set('chats', chats);
        } catch (e: any) {
            console.error(e);
        }
    }

    async getUsersByChatId(chatId: number) {
        try {
            const user = await this.api.getUsersByChatId(chatId, { offset: 0, limit: 10 });
            store.set('currentChat', {
                chatId,
                users: user
            });
        } catch (e: any) {
            console.error(e);
        }
    }

    async changeChatAvatar(data: Indexed) {
        try {
            const avatar = await this.api.changeChatAvatar(data);
            store.set('chats', avatar);
        } catch (e: any) {
            console.error(e);
        }
    }

    async deleteUsersFromChat(data: Indexed) {
        try {
            const users = await this.api.deleteUsersFromChat(data);
            store.set('currentChat.users', users);
        } catch (e: any) {
            console.error(e);
        }
    }

    async getToken(chatId: number) {
        try {
            await this.api.getToken(chatId);
        } catch (e: any) {
            console.error(e);
        }
    }
}

export default new ChatsController();
