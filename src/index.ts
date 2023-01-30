import '../declarations.d';
import renderElement from './utils/renderElement';
import compileHome from './pages/main.pug';
import loginPage from './pages/loginPage/loginPage';
import registrationPage from './pages/registrationPage/registrationPage';
import editProfilePage from './pages/EditProfilePage/EditProfilePage';
import userProfilePage from './pages/userProfilePage/userProfilePage';
import chatsPage from './pages/chatsPage/chatsPage';
import errorPage500 from './pages/errorPage500/errorPage500';
import errorPage404 from './pages/errorPage404/errorPage404';
import Message from './components/message/message';

const root: HTMLElement = document.getElementById('root')!;
const headTitle: HTMLHeadElement = document.getElementById('head__title')!;
const path: string = window.location.pathname;
const msgtext = '"World\'s Greatest Boss." They go, "Oh, we\'ve never worked in a place like this before, you\'re such a riot. You get the best out of us." And I go, you know, "Que sera, sera." If that\'s true -- awesome.';

if (path === '/') {
	headTitle.textContent = 'Home page';
	root.innerHTML = compileHome({ route: 'chats', value: 'Click me' });
} else if (path === '/chats') {
	headTitle.textContent = 'Chats';
	renderElement('.main', chatsPage);
	renderElement('.chat-view', new Message({ class: 'msg-component-companion', msgText: 'Camera!', msgType: 'user', date: '12:42' }));
	renderElement('.chat-view', new Message({ class: 'msg-component-user', msgText: msgtext, msgType: 'companion', date: '12:42' }));
	renderElement('.chat-view', new Message({ class: 'msg-component-user', msgText: 'No! God, please! NOOOO', msgType: 'companion', date: '12:45' }));
} else if (path === '/page500') {
	headTitle.textContent = 'Error';
	renderElement('.main', errorPage500);
} else if (path === '/signin') {
	headTitle.textContent = 'Sign-in';
	renderElement('.main', loginPage);
} else if (path === '/signup') {
	headTitle.textContent = 'Sign-up';
	renderElement('.main', registrationPage);
} else if (path === '/user') {
	headTitle.textContent = 'Profile';
	renderElement('.main', userProfilePage);
} else if (path === '/edituser') {
	headTitle.textContent = 'Edit profile';
	renderElement('.main', editProfilePage);
} else {
	headTitle.textContent = 'Page not found';
	renderElement('.main', errorPage404);
}
