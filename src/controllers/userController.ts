import { Routes } from "..";
import userApi, { UserAPI } from "../api/userApi";
import router from "../modules/router";
import store from "../modules/store";
import { closeModal } from "../utils/handlers";
import { Indexed } from "../utils/helpers";

export class UserController {
  private readonly api: UserAPI;

  constructor() {
    this.api = userApi;
  }

  async changeProfile(data: Indexed) {
    try {
      await this.api.changeProfile(data);
      router.go(Routes.Profile)
    } catch (e: any) {
      console.error(e);
    }
  }

  async changePassword(data: Indexed) {
    try {
      await this.api.changePassword({ oldPassword: data.oldPassword, newPassword: data.newPassword });
      closeModal();
    } catch (e: any) {
      console.error(e);
      const errorText: HTMLElement | null = document.querySelector('.password-error');
      errorText?.classList.remove('hidden');
    }
  }

  async changeAvatar(data: Indexed) {
    try {
      const user = await this.api.changeAvatar(data);
      store.set('user', user);
      closeModal();
    } catch (e: any) {
      console.error(e);
      const errorText: HTMLElement | null = document.querySelector('.modal-error');
      errorText?.classList.remove('hidden');
    }
  }
}

export default new UserController();
