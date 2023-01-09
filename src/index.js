import user from './user-data';
import compileHome from '../views/main.pug';
import compileChats from '../views/chats.pug';
import compileUser from '../views/user.pug';
import compileEditUser from '../views/edituser.pug';
import compileSignIn from '../views/signin.pug';
import compileSignUp from '../views/signup.pug';
import compileError from '../views/error.pug';

const root = document.getElementById('root');
const headTitle = document.getElementById('head__title');
const path = window.location.pathname;


if (path === '/') {
    headTitle.textContent = 'Home page'; 
    root.innerHTML = compileHome();
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