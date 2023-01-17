import { createButton } from './utils/createButton';
import user from './user-data';
import compileHome from './pages/main.pug';
import compileChats from './pages/chats.pug';
import compileUser from './pages/user.pug';
import compileEditUser from './pages/edituser.pug';
import compileSignIn from './pages/signin.pug';
import compileSignUp from './pages/signup.pug';
import compileError from './pages/error.pug';

const root = document.getElementById('root');
const headTitle = document.getElementById('head__title');
const path = window.location.pathname;


if (path === '/') {
    headTitle.textContent = 'Home page'; 
    root.innerHTML = compileHome({route: 'chats', value: 'Click me'});
}  else if (path === '/chats') {
    headTitle.textContent = 'Chats'; 
    root.innerHTML = compileChats();
} else if (path === '/page500') {
    headTitle.textContent = 'Error';
    root.innerHTML = compileError({error_number: 500, error_text: 'Oops! something went wrong.'});
} else if (path === '/signin') {
    headTitle.textContent = 'Sign-in';
    root.innerHTML = compileSignIn();
} else if (path === '/signup') {
    headTitle.textContent = 'Sign-up';
    root.innerHTML = compileSignUp();
} else if (path === '/user') {
    headTitle.textContent = 'Profile';
    root.innerHTML = compileUser(user);
} else if (path === '/edituser') {
    headTitle.textContent = 'Edit profile';
    root.innerHTML = compileEditUser(user);
} else {
    headTitle.textContent = 'Page not found';
    root.innerHTML = compileError({error_number: 404, error_text: 'Page not found'});
}