import Button from '../../components/button/btn';
import RegistrationForm from '../../components/registrationForm/registrationForm';
import InputBlock from '../../components/inputBlock/inputBlock';
import Input from '../../components/input/input';
import Layout from '../layout/layout';
import { focusHandler, blurHandler, submitHandler } from '../../utils/handlers';

const inputEmail = new InputBlock({
    input: new Input({
        classAttr: 'form__input',
        nameAttr: 'email',
        placeholderAttr: 'pochta@yandex.ru',
        typeAttr: 'email',
        valueAttr: '',
        events: {
            focus: e => focusHandler(e),
            blur: e => blurHandler(e)
        }
    }),
    class: 'form__group',
    forAttr: 'email',
    labelText: 'E-mail',
});

const inputLogin = new InputBlock({
    input: new Input({
        classAttr: 'form__input',
        nameAttr: 'login',
        placeholderAttr: 'IvanIvanov001',
        typeAttr: 'text',
        valueAttr: '',
        events: {
            focus: e => focusHandler(e),
            blur: e => blurHandler(e)
        }
    }),
    classAttr: 'form__group',
    labelText: 'Login',
    forAttr: 'login',
});

const inputFirstName = new InputBlock({
    input: new Input({
        classAttr: 'form__input',
        nameAttr: 'first_name',
        placeholderAttr: 'Ivan',
        typeAttr: 'text',
        valueAttr: '',
        events: {
            focus: e => focusHandler(e),
            blur: e => blurHandler(e)
        }
    }),
    classAttr: 'form__group',
    forAttr: 'first_name',
    labelText: 'Name',
});

const inputSecondName = new InputBlock({
    input: new Input({
        classAttr: 'form__input',
        nameAttr: 'second_name',
        placeholderAttr: 'Ivanov',
        typeAttr: 'text',
        valueAttr: '',
        events: {
            focus: e => focusHandler(e),
            blur: e => blurHandler(e)
        }
    }),
    classAttr: 'form__group',
    forAttr: 'second_name',
    labelText: 'Last name',
});


const inputPhone = new InputBlock({
    input: new Input({
        classAttr: 'form__input',
        nameAttr: 'phone',
        placeholderAttr: '89091234567',
        typeAttr: 'tel',
        valueAttr: '',
        events: {
            focus: e => focusHandler(e),
            blur: e => blurHandler(e)
        }
    }),
    classAttr: 'form__group',
    forAttr: 'phone',
    labelText: 'Phone',
});

const inputPassword = new InputBlock({
    input: new Input({
        classAttr: 'form__input',
        nameAttr: 'password',
        placeholderAttr: '••••••••',
        typeAttr: 'password',
        valueAttr: '',
        events: {
            focus: e => focusHandler(e),
            blur: e => blurHandler(e)
        }
    }),
    classAttr: 'form__group',
    forAttr: 'email',
    labelText: 'Password',
});

const buttonMain = new Button({
    classAttr: 'btn__main',
    route: 'chats',
    value: 'Create an account',
    linkColor: 'main',
});

const buttonSecondary = new Button({
    classAttr: 'btn__secondary',
    route: 'signin',
    value: 'Sign in',
    linkColor: 'secondary'
});

const registrationForm = new RegistrationForm({
    classAttr: 'form__box',
    title: 'Sign up',
    buttonMain: buttonMain,
    buttonSecondary: buttonSecondary,
    inputEmail: inputEmail,
    inputLogin: inputLogin,
    inputFirstName: inputFirstName,
    inputSecondName: inputSecondName,
    inputPhone: inputPhone,
    inputPassword: inputPassword,
    events: {
        submit: e => submitHandler(e),
    }
});

const layout = new Layout({
    classAttr: 'container flex-center',
    content: registrationForm,
})

const registrationPage = layout;
export default registrationPage;
