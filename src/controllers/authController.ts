import { Routes } from "..";
import authApi, { AuthAPI } from "../api/authApi";
import router from "../modules/router/router";
import store from "../modules/store";
import { Indexed } from "../utils/helpers";
import chatsController from "./chatsController";
import messagesController from "./messagesController";

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = authApi;
  }

  async signin(data: Indexed) {
    try {
      await this.api.signin(data);
      await this.fetchUser();
      await chatsController.getChats(store.getState().user.id)
      router.go(Routes.Chats);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async signup(data: Indexed) {
    try {
      await this.api.signup(data);
      await this.fetchUser();
      router.go(Routes.Chats);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async fetchUser() {
    const user = await this.api.read();
    store.set('user', user);
  }

  async logout() {
    try {
      await this.api.logout();
      messagesController.closeAll();
      const root: HTMLElement | null = document.querySelector('.main');
      while (root?.firstChild) {
        root.removeChild(root.firstChild);
      }
      router.go(Routes.Index);
      store.clear();
    } catch (e: unknown) {
      console.error(e);
    }
  }
}

export default new AuthController();
