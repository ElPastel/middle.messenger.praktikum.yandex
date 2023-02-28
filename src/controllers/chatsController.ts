import chatsApi, { ChatsAPI } from "../api/chatsApi";
import store from "../modules/store";
import { closeModal } from "../utils/handlers";
import { Indexed } from "../utils/helpers";
import messagesController from "./messagesController";

export class ChatsController {
    private readonly api: ChatsAPI;

    constructor() {
        this.api = chatsApi;
    }

    async getChats(data: Indexed) {
        try {
            const chats = await this.api.getChats(data) as Record<string, (string | number)>[];

            chats.map(async (chat: Record<string, (string | number)>) => {
                const token = await this.getToken(chat.id as number);
                await messagesController.connect(chat.id as number, token);
            });

            store.set('chats', chats);
        } catch (e: unknown) {
            console.error(e);
        }
    }

    async showChats(data: Indexed) {
        try {
            await this.getChats(data);

        } catch (e: unknown) {
            console.error(e);
        }
    }

    async createChat(data: Indexed) {
        try {
            await this.api.createChat(data);
            this.getChats({});
            closeModal();
        } catch (e: unknown) {
            console.error(e);
            const errorText: HTMLElement | null = document.querySelector('.modal-error');
            errorText?.classList.remove('hidden');
        }
    }

    async deleteChat() {
        try {
            const chatId = this.getCurrentChatId();
            await this.api.deleteChat({ chatId: chatId });
            this.getChats({});
        } catch (e: unknown) {
            console.error(e);
        }
    }

    async getUsersByChatId(id: number) {
        try {
            const users = await this.api.getUsersByChatId(id, { offset: 0 });
            store.set('currentChatUsers', users);
        } catch (e: unknown) {
            console.error(e);
        }
    }

    async changeChatAvatar(data: Indexed) {
        try {
            const avatar = await this.api.changeChatAvatar(data);
            store.set('chats', avatar);
        } catch (e: unknown) {
            console.error(e);
        }
    }

    async addUserToChat(userId: Indexed) {
        try {
            const chatId = this.getCurrentChatId();
            await this.api.addUsersToChat({ users: [userId], chatId: chatId });
            await this.getUsersByChatId(chatId);
        } catch (e: unknown) {
            console.error(e);
        }
    }

    async deleteUserFromChat(userId: Indexed) {
        try {
            const chatId = this.getCurrentChatId();
            await this.api.deleteUsersFromChat({ users: [userId], chatId: chatId });
            await this.getUsersByChatId(chatId);
        } catch (e: unknown) {
            console.error(e);
        }
    }

    getToken(id: number) {
        return this.api.getToken(id);
    }

    selectChat(id: number) {
        store.set('currentChat', id);
    }

    getCurrentChatId(): number {
        return store.getState().currentChat ?? 0;
    }
}

export default new ChatsController();
