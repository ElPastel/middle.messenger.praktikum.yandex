import Input from '../../components/input/input';
import Button from '../../components/button/btn';
import RegistrationForm from '../../components/registrationForm/registrationForm';
import Layout from '../layout/layout';
import userData from '../../user-data';
import InputBlock from '../../components/inputBlock/inputBlock';
import { inputHandlers, submitHandler } from '../../utils/handlers';

const inputEmail = new InputBlock({
    input: new Input({
        classAttr: 'form__input',
        nameAttr: 'email',
        placeholderAttr: 'pochta@yandex.ru',
        typeAttr: 'email',
        valueAttr: userData.email,
        events: inputHandlers
    }),
    classAttr: 'form__group',
    forAttr: 'email',
    labelText: 'E-mail',
});

const inputLogin = new InputBlock({
    input: new Input({
        classAttr: 'form__input',
        nameAttr: 'login',
        placeholderAttr: 'IvanIvanov001',
        typeAttr: 'text',
        valueAttr: userData.login,
        events: inputHandlers
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
        valueAttr: userData.first_name,
        events: inputHandlers
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
        valueAttr: userData.second_name,
        events: inputHandlers
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
        valueAttr: userData.phone,
        events: inputHandlers
    }),
    classAttr: 'form__group',
    forAttr: 'phone',
    labelText: 'Phone',
});

const buttonMain = new Button({
    classAttr: 'btn__main',
    route: 'user',
    value: 'Save',
    linkColor: 'main'
});

const buttonSecondary = new Button({
    classAttr: 'btn__secondary',
    route: 'chats',
    value: 'Back to chats',
    linkColor: 'secondary'
});

const registrationForm = new RegistrationForm({
    classAttr: 'form__box', 
    title: 'Edit profile',
    buttonMain: buttonMain,
    buttonSecondary: buttonSecondary,
    inputEmail: inputEmail,
    inputLogin: inputLogin,
    inputFirstName: inputFirstName,
    inputSecondName: inputSecondName,
    inputPhone: inputPhone,
    events: submitHandler
});

const layout = new Layout({
    classAttr: 'container flex-center',
    content: registrationForm
})

const editProfilePage = layout;

export default editProfilePage;
