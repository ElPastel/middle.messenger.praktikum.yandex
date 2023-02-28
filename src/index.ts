import '../declarations.d';
import Router from './modules/router';
import router from './modules/router';
import chatsController from './controllers/chatsController';
import authController from './controllers/authController';
import UserProfilePageWithUser from './pages/userProfilePage/userProfilePage';
import userProfilePageProps from './pages/userProfilePage/userProfilePageProps';
import LoginPage from './pages/loginPage/loginPage';
import loginPageProps from './pages/loginPage/loginPageProps';
import RegPage from './pages/registrationPage/registrationPage';
import regPageProps from './pages/registrationPage/registrationPageProps';
import ChatsPageWithSelectedChat from './pages/chatsPage/chatsPage';
import EditProfilePageWithUser from './pages/EditProfilePage/EditProfilePage';

export enum Routes {
    Index = '/',
    Register = '/signup',
    Profile = '/profile',
    Chats = '/chats',
    Edit = '/editprofile',
    Error404 = '/error404',
    Error500 = '/error500'
}

window.addEventListener('DOMContentLoaded', async () => {
    router
        .use(Routes.Index, LoginPage, loginPageProps)
        .use(Routes.Register, RegPage, regPageProps)
        .use(Routes.Profile, UserProfilePageWithUser, userProfilePageProps)
        .use(Routes.Chats, ChatsPageWithSelectedChat, {})
        .use(Routes.Edit, EditProfilePageWithUser, {})

    let isProtectedRoute = true;

    switch (window.location.pathname) {
        case Routes.Index:
        case Routes.Register:
            isProtectedRoute = false;
            break;
    }

    try {
        await authController.fetchUser();

        Router.start();
        if (window.location.pathname === Routes.Chats) {
            chatsController.getChats({ offset: 0, limit: 10 });
        }

        if (!isProtectedRoute) {
            Router.go(Routes.Chats)
        }
    } catch (e) {
        Router.start();
        console.log(e.message);
    }
})

