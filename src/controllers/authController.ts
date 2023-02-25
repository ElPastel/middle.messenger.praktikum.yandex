import authApi, { AuthAPI, SigninData, SignupData } from "../api/authApi";
import router from "../modules/router";
import store from "../modules/store";

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = authApi;
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);
      await this.fetchUser();
      router.go('/chats');

    } catch (e: any) {
      console.error(e);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);
      await this.fetchUser();
      router.go('/chats');
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async fetchUser() {
      const user = await this.api.read();
      // debugger
      store.set('user', user);
      // console.log(store.getState());
  }

  async logout() {
    try {
      await this.api.logout();
      router.go('/');
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new AuthController();
