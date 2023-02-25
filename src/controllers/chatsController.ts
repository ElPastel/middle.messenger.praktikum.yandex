import chatsApi, { ChatsAPI } from "../api/chatsApi";
import store from "../modules/store";
import { closeModal } from "../utils/handlers";

import { Indexed } from "../utils/helpers";

export class ChatsController {
    private readonly api: ChatsAPI;

    constructor() {
        this.api = chatsApi;
    }

    //fetch
    async getChats(data: Indexed) {
        try {
            const chats = await this.api.getChats(data);

            // chats.map(async (chat) => {
            //     const token = await this.getToken(chat.id);

            //     await MessagesController.connect(chat.id, token);
            // });

            store.set('chats', chats);
            console.log(store.getState().chats);
        } catch (e: any) {
            console.error(e);
        }
    }

    async showChats(data: Indexed) {
        try {
            await this.getChats(data);
            console.log(store.getState());

        } catch (e: any) {
            console.error(e);
        }
    }

    //create
    async createChat(data: Indexed) {
        try {
            await this.api.createChat(data);
            this.getChats({});
            closeModal();
        } catch (e: any) {
            console.error(e);
            const errorText: HTMLElement | null = document.querySelector('.modal-error');
            errorText?.classList.remove('hidden');
        }
    }

    async deleteChat(id: number) {
        try {
            await this.api.deleteChat(id);
            this.getChats({});
        } catch (e: any) {
            console.error(e);
        }
    }

    async getUsersByChatId(id: number) {
        try {
            const user = await this.api.getUsersByChatId(id, { offset: 0, limit: 10 });
            store.set('currentChat', {
                id,
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

    async getToken(id: number) {
        try {
            await this.api.getToken(id);
        } catch (e: any) {
            console.error(e);
        }
    }

    selectChat(id: number) {
        store.set('selectedChat', id);
    }
}

export default new ChatsController();
