import { Routes } from "..";
import userApi, { UserAPI } from "../api/userApi";
import router from "../modules/router";
import { Indexed } from "../utils/helpers";

export class UserController {
  private readonly api: UserAPI;

  constructor() {
    this.api = userApi;
  }

  async changeProfile(data: Indexed) {
    try {
      await this.api.changeProfile(data);
    } catch (e: any) {
      console.error(e);
    }
  }

  async changePassword(data: Indexed) {
    try {
      await this.api.changePassword({ oldPassword: data.oldPassword, newPassword: data.newPassword });
      debugger
      router.go(Routes.Chats);
    } catch (e: any) {
      console.error(e);
    }
  }

  async changeAvatar(data: Indexed) {
    try {
      await this.api.changeAvatar(data);
    } catch (e: any) {
      console.error(e);
    }
  }
}

export default new UserController();
