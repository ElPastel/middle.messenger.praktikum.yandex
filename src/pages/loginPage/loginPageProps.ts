import Input from '../../components/input/input';
import Button from '../../components/button/btn';
import LoginForm from '../../components/loginForm/loginForm';
import InputBlock from '../../components/inputBlock/inputBlock';
import { inputHandlers, submitHandlerLog } from '../../utils/handlers';
import router from '../../modules/router';

const inputLogin = new InputBlock({
    input: new Input({
        classAttr: 'form__input',
        nameAttr: 'login',
        placeholderAttr: 'IvanIvanov001',
        typeAttr: 'text',
        valueAttr: '',
        events: inputHandlers
    }),
    classAttr: 'form__group',
    labelText: 'Login',
    forAttr: 'login',
});

const inputPassword = new InputBlock({
    input: new Input({
        classAttr: 'form__input',
        nameAttr: 'password',
        placeholderAttr: '••••••••',
        typeAttr: 'password',
        valueAttr: '',
        events: inputHandlers
    }),
    classAttr: 'form__group',
    forAttr: 'email',
    labelText: 'Password',
});

const buttonMain = new Button({
    classAttr: 'btn__main',
    route: 'chats',
    value: 'Login',
    linkColor: 'main',
});

const buttonSecondary = new Button({
    classAttr: 'btn__secondary',
    route: 'signup',
    value: 'Create an account',
    linkColor: 'secondary',
    events: {
        click: () => router.go('/signup')
    }
});

const loginForm = new LoginForm({
    classAttr: 'form__box flex-form signin',
    title: 'Sign in',
    buttonMain: buttonMain,
    buttonSecondary: buttonSecondary,
    inputLogin: inputLogin,
    inputPassword: inputPassword,
    events: submitHandlerLog
});

const loginPageProps = {
    classAttr: 'container flex-center',
    content: loginForm
};

export default loginPageProps;
