import router from './modules/router/router';
import chatsController from './controllers/chatsController';
import authController from './controllers/authController';
import UserProfilePageWithUser from './pages/userProfilePage/userProfilePage';
import LoginPage from './pages/loginPage/loginPage';
import RegPage from './pages/registrationPage/registrationPage';
import ChatsPageWithSelectedChat from './pages/chatsPage/chatsPage';
import EditProfilePageWithUser from './pages/EditProfilePage/EditProfilePage';
import ErrorPage404 from './pages/errorPage404/errorPage404';
import ErrorPage500 from './pages/errorPage500/errorPage500';
import '../public/main.scss';

export enum Routes {
    Index = '/',
    Register = '/sign-up',
    Profile = '/profile',
    Chats = '/messenger',
    Edit = '/settings',
    Error404 = '/error404',
    Error500 = '/error500'
}

window.addEventListener('DOMContentLoaded', async () => {
    router
        .use(Routes.Index, LoginPage, {})
        .use(Routes.Register, RegPage, {})
        .use(Routes.Profile, UserProfilePageWithUser, {})
        .use(Routes.Chats, ChatsPageWithSelectedChat, {})
        .use(Routes.Edit, EditProfilePageWithUser, {})
        .use(Routes.Error404, ErrorPage404, {})
        .use(Routes.Error500, ErrorPage500, {})

    let isProtectedRoute = true;

    switch (window.location.pathname) {
        case Routes.Index:
        case Routes.Register:
            isProtectedRoute = false;
            break;
    }

    try {
        await authController.fetchUser();

        router.start();
        if (window.location.pathname === Routes.Chats) {
            chatsController.getChats({ offset: 0, limit: 10 });
        }

        if (!isProtectedRoute) {
            router.go(Routes.Chats)
        }

        
    } catch (e) {
        router.start();
        console.log(e.message);
    }
})

