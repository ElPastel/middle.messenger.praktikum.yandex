
import Button from '../../components/button/btn';
import RegistrationForm from '../../components/registrationForm/registrationForm';
import InputBlock from '../../components/inputBlock/inputBlock';
import { editHandler, inputHandlers } from '../../utils/handlers';
import router from '../../modules/router';
import InputWithUser from '../../components/input/input';

const inputEmail = new InputBlock({
    input: new InputWithUser({
        classAttr: 'form__input',
        idAttr: 'email',
        nameAttr: 'email',
        placeholderAttr: 'pochta@yandex.ru',
        typeAttr: 'email',
        valueAttr: 'email',
        events: inputHandlers
    }),
    classAttr: 'form__group',
    forAttr: 'email',
    labelText: 'E-mail',
});

const inputLogin = new InputBlock({
    input: new InputWithUser({
        classAttr: 'form__input',
        nameAttr: 'login',
        placeholderAttr: 'IvanIvanov001',
        typeAttr: 'text',
        // valueAttr: '',
        events: inputHandlers
    }),
    classAttr: 'form__group',
    labelText: 'Login',
    forAttr: 'login',
});

const inputFirstName = new InputBlock({
    input: new InputWithUser({
        classAttr: 'form__input',
        nameAttr: 'first_name',
        placeholderAttr: 'Ivan',
        typeAttr: 'text',
        // valueAttr: userData.first_name,
        events: inputHandlers
    }),
    classAttr: 'form__group',
    forAttr: 'first_name',
    labelText: 'Name',
});

const inputSecondName = new InputBlock({
    input: new InputWithUser({
        classAttr: 'form__input',
        nameAttr: 'second_name',
        placeholderAttr: 'Ivanov',
        typeAttr: 'text',
        // valueAttr: userData.second_name,
        events: inputHandlers
    }),
    classAttr: 'form__group',
    forAttr: 'second_name',
    labelText: 'Last name',
});

const inputDisplayName = new InputBlock({
    input: new InputWithUser({
        classAttr: 'form__input',
        nameAttr: 'display_name',
        placeholderAttr: 'MyName',
        typeAttr: 'text',
        // valueAttr: userData.second_name,
        events: inputHandlers
    }),
    classAttr: 'form__group',
    forAttr: 'display_name',
    labelText: 'Display name',
});

const inputPhone = new InputBlock({
    input: new InputWithUser({
        classAttr: 'form__input',
        nameAttr: 'phone',
        placeholderAttr: '89091234567',
        typeAttr: 'tel',
        // valueAttr: userData.phone,
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
    linkColor: 'secondary',
    events: {
        click: () => router.go('/chats')
    }
});

const registrationForm = new RegistrationForm({
    classAttr: 'form__box form__ediprofile', 
    title: 'Edit profile',
    buttonMain: buttonMain,
    buttonSecondary: buttonSecondary,
    inputEmail: inputEmail,
    inputLogin: inputLogin,
    inputFirstName: inputFirstName,
    inputSecondName: inputSecondName,
    inputDisplayName: inputDisplayName,
    inputPhone: inputPhone,
    events: editHandler
});


const editPageProps = {
    classAttr: 'container flex-center',
    content: registrationForm,
};

export default editPageProps;
