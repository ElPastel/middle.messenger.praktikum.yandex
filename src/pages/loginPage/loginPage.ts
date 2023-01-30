import Input from '../../components/input/input';
import Button from '../../components/button/btn';
import LoginForm from '../../components/loginForm/loginForm';
import Layout from '../layout/layout';
import InputBlock from '../../components/inputBlock/inputBlock';
import { focusHandler, blurHandler, submitHandler } from '../../utils/handlers';

const inputLogin = new InputBlock({
    input: new Input({
        class: 'form__input',
        nameAttr: 'login',
        placeholderAttr: 'IvanIvanov001',
        typeAttr: 'text',
        valueAttr: '',
        events: {
            focus: e => focusHandler(e),
            blur: e => blurHandler(e)
        }
    }),
    class: 'form__group',
    labelText: 'Login',
    forAttr: 'login',
});

const inputPassword = new InputBlock({
    input: new Input({
        class: 'form__input',
        nameAttr: 'password',
        placeholderAttr: '••••••••',
        typeAttr: 'password',
        valueAttr: '',
        events: {
            focus: e => focusHandler(e),
            blur: e => blurHandler(e)
        }
    }),
    class: 'form__group',
    forAttr: 'email',
    labelText: 'Password',
});


const buttonMain = new Button({
    class: 'btn__main',
    route: 'chats',
    value: 'Login',
    linkColor: 'main'
});

const buttonSecondary = new Button({
    class: 'btn__secondary',
    route: 'signup',
    value: 'Create an account',
    linkColor: 'secondary'
});

const loginForm = new LoginForm({
    class: ['form__box', 'flex-form'],
    title: 'Sign in',
    buttonMain: buttonMain,
    buttonSecondary: buttonSecondary,
    inputLogin: inputLogin,
    inputPassword: inputPassword,
    events: {
        submit: e => submitHandler(e),
    }
});

const layout = new Layout({
    class: ['container', 'flex-center'],
    content: loginForm
})

const loginPage = layout;

export default loginPage;
