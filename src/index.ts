import '../declarations.d';
import renderElement from './utils/renderElement';
import compileHome from './pages/main.pug';
import editProfilePage from './pages/EditProfilePage/EditProfilePage';
import chatsPage, { chatMenu, sectionSelection, sectionView } from './pages/chatsPage/chatsPage';
import errorPage500 from './pages/errorPage500/errorPage500';
import errorPage404 from './pages/errorPage404/errorPage404';
import Message from './components/message/message';
import Router from './modules/router';
import LoginForm from './components/loginForm/loginForm';
import Layout from './pages/layout/layout';
import Chats from './components/chats/chats';
import router from './modules/router';
import loginPageProps from './pages/loginPage/loginPageProps';
import regPageProps from './pages/registrationPage/registrationPageProps';
import UserProfilePageWithUser from './pages/userProfilePage/userProfilePage';
import userProfilePageProps from './pages/userProfilePage/userProfilePageProps';

import user from './user-data';
import LoginPage from './pages/loginPage/loginPage';
import RegPage from './pages/registrationPage/registrationPage';
import authController from './controllers/authController';
import { T } from './modules/block';

import Test from './pages/test/test';
import store from './modules/store';
import EditProfilePage from './pages/EditProfilePage/EditProfilePage';
import editPageProps from './pages/EditProfilePage/EditProfilePageProps';
import EditProfilePageWithUser from './pages/EditProfilePage/EditProfilePage';
import chatsController from './controllers/chatsController';


// const root: HTMLElement = document.getElementById('root')!;
// const headTitle: HTMLHeadElement = document.getElementById('head__title')!;
// const path: string = window.location.pathname;
// const msgtext = '"World\'s Greatest Boss." They go, "Oh, we\'ve never worked in a place like this before, you\'re such a riot. You get the best out of us." And I go, you know, "Que sera, sera." If that\'s true -- awesome.';

export enum Routes {
    Index = '/',
    Register = '/signup',
    Profile = '/profile',
    Chats = '/chats',
    Edit = '/editprofile'
}

window.addEventListener('DOMContentLoaded', async () => {
    router
        .use(Routes.Index, LoginPage, loginPageProps)
        .use(Routes.Register, RegPage, regPageProps)
        .use(Routes.Profile, UserProfilePageWithUser, userProfilePageProps)
        .use(Routes.Chats, Chats, {
            sectionSelection: sectionSelection,
            sectionView: sectionView,
            chatMenu: chatMenu,
        })
        .use(Routes.Edit, EditProfilePageWithUser, editPageProps);


    let isProtectedRoute = true;

    switch (window.location.pathname) {
        case Routes.Index:
        case Routes.Register:
            isProtectedRoute = false;
            break;
    }
    // Router.start();


    try {
        // authController.fetchUser();

        Router.start();
        // console.log(response);
        if (window.location.pathname === Routes.Chats) {
            chatsController.getChats({offset: 0, limit: 10});
        }


        // if (!isProtectedRoute) {
        //     Router.go(Routes.Chats)
        // }
    } catch (e) {
        Router.start();
        console.log(e);


        // if (isProtectedRoute) {
        //     Router.go(Routes.Index);
        // }
    }
})



// if (path === '/') {
// 	headTitle.textContent = 'Home page';
// 	root.innerHTML = compileHome({ route: 'chats', value: 'Click me' });
// } else if (path === '/chats') {
// 	headTitle.textContent = 'Chats';
// 	renderElement('.main', chatsPage);
// 	renderElement('.chat-view', new Message({ class: 'msg-component-companion', msgText: 'Camera!', msgType: 'user', date: '12:42' }));
// 	renderElement('.chat-view', new Message({ class: 'msg-component-user', msgText: msgtext, msgType: 'companion', date: '12:42' }));
// 	renderElement('.chat-view', new Message({ class: 'msg-component-user', msgText: 'No! God, please! NOOOO', msgType: 'companion', date: '12:45' }));
// } else if (path === '/page500') {
// 	headTitle.textContent = 'Error';
// 	renderElement('.main', errorPage500);
// } else if (path === '/signin') {
// 	headTitle.textContent = 'Sign-in';
// 	renderElement('.main', loginPage);
// } else if (path === '/signup') {
// 	headTitle.textContent = 'Sign-up';
// 	renderElement('.main', registrationPage);
// } else if (path === '/user') {
// 	headTitle.textContent = 'Profile';
// 	renderElement('.main', userProfilePage);
// } else if (path === '/edituser') {
// 	headTitle.textContent = 'Edit profile';
// 	renderElement('.main', editProfilePage);
// } else {
// 	headTitle.textContent = 'Page not found';
// 	renderElement('.main', errorPage404);
// }

