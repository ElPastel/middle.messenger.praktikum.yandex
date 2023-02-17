import http from "../modules/http";

export default abstract class BaseAPI {
  protected http: typeof http;

  protected constructor() {
    this.http = http;
  }

  public abstract create?(data: unknown): Promise<unknown>;

  public abstract read?(identifier?: string): Promise<unknown>;

  public abstract update?(identifier: string, data: unknown): Promise<unknown>;

  public abstract delete?(identifier: string): Promise<unknown>;
}


// export abstract class BaseApi {
//     // Authorization ---------------------------------------------------------
//     register(body: any) {
//       throw new Error(`Not implemented. Body: ${JSON.stringify(body, null, 2)}`)
//     }
  
//     login(body: any) {
//       throw new Error(`Not implemented. Body: ${JSON.stringify(body, null, 2)}`)
//     }
  
//     logout(body: any) {
//       throw new Error(`Not implemented. Body: ${JSON.stringify(body, null, 2)}`)
//     }
  
//     getUserInfo(body: any) {
//       throw new Error(`Not implemented. Body: ${JSON.stringify(body, null, 2)}`)
//     }
  
//     // Users ---------------------------------------------------------
//     userById(body: any) {
//       throw new Error(`Not implemented. Body: ${JSON.stringify(body, null, 2)}`)
//     }
  
//     updateProfile(body: any) {
//       throw new Error(`Not implemented. Body: ${JSON.stringify(body, null, 2)}`)
//     }
  
//     updateAvatar(body: any) {
//       throw new Error(`Not implemented. Body: ${JSON.stringify(body, null, 2)}`)
//     }
  
//     updatePassword(body: any) {
//       throw new Error(`Not implemented. Body: ${JSON.stringify(body, null, 2)}`)
//     }
  
//     userByLogin(body: any) {
//       throw new Error(`Not implemented. Body: ${JSON.stringify(body, null, 2)}`)
//     }
  
//     // Chats ---------------------------------------------------------
//     getChats(body: any) {
//       throw new Error(`Not implemented. Body: ${JSON.stringify(body, null, 2)}`)
//     }
  
//     createChat(body: any) {
//       throw new Error(`Not implemented. Body: ${JSON.stringify(body, null, 2)}`)
//     }
  
//     deleteChat(body: any) {
//       throw new Error(`Not implemented. Body: ${JSON.stringify(body, null, 2)}`)
//     }
  
//     getUsersByChatId(id: number, body: any) {
//       throw `${new Error(`Not implemented. Body: ${JSON.stringify(body, null, 2)}`)} id: ${id}`
//     }
  
//     getUnreadCount(body: any) {
//       throw new Error(`Not implemented. Body: ${JSON.stringify(body, null, 2)}`)
//     }
  
//     uploadChatAvatar(body: any) {
//       throw new Error(`Not implemented. Body: ${JSON.stringify(body, null, 2)}`)
//     }
  
//     addUsersToChat(body: any) {
//       throw new Error(`Not implemented. Body: ${JSON.stringify(body, null, 2)}`)
//     }
  
//     deleteUsersFromChat(body: any) {
//       throw new Error(`Not implemented. Body: ${JSON.stringify(body, null, 2)}`)
//     }
//   }
