import Block, { T } from '../../modules/block/block';
import './registrationPage.scss';
import template from './registrationPage.pug';
import RegistrationForm from '../../components/registrationForm/registrationForm';
import { inputHandlers, submitHandlerReg } from '../../utils/handlers';
import Button from '../../components/button/btn';
import router from '../../modules/router/router';
import InputBlock from '../../components/inputBlock/inputBlock';
import { Input } from '../../components/input/input';
import { Routes } from '../..';

class RegPage extends Block<T> {
    constructor(props: T) {
        super(props, 'main');
    }

    protected init(): void {
        this.children = {
            content: new RegistrationForm({
                classAttr: 'form__box',
                title: 'Sign up',
                buttonMain: new Button({
                    classAttr: 'btn__main',
                    route: '',
                    value: 'Create an account',
                    linkColor: 'main',
                }),
                buttonSecondary: new Button({
                    classAttr: 'btn__secondary',
                    route: '',
                    value: 'Sign in',
                    linkColor: 'secondary',
                    events: {
                        click: () => router.go(Routes.Index)
                    }
                }),
                inputEmail: new InputBlock({
                    input: new Input({
                        classAttr: 'form__input',
                        nameAttr: 'email',
                        placeholderAttr: 'pochta@yandex.ru',
                        typeAttr: 'email',
                        valueAttr: '',
                        events: inputHandlers
                    }),
                    class: 'form__group',
                    forAttr: 'email',
                    error: 'email',
                    labelText: 'E-mail',
                }),
                inputLogin: new InputBlock({
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
                    error: 'login',
                }),
                inputFirstName: new InputBlock({
                    input: new Input({
                        classAttr: 'form__input',
                        nameAttr: 'first_name',
                        placeholderAttr: 'Ivan',
                        typeAttr: 'text',
                        valueAttr: '',
                        events: inputHandlers
                    }),
                    classAttr: 'form__group',
                    forAttr: 'first_name',
                    error: 'first_name',
                    labelText: 'Name',
                }),
                inputSecondName: new InputBlock({
                    input: new Input({
                        classAttr: 'form__input',
                        nameAttr: 'second_name',
                        placeholderAttr: 'Ivanov',
                        typeAttr: 'text',
                        valueAttr: '',
                        events: inputHandlers
                    }),
                    classAttr: 'form__group',
                    forAttr: 'second_name',
                    error: 'second_name',
                    labelText: 'Last name',
                }),
                inputPhone: new InputBlock({
                    input: new Input({
                        classAttr: 'form__input',
                        nameAttr: 'phone',
                        placeholderAttr: '89091234567',
                        typeAttr: 'tel',
                        valueAttr: '',
                        events: inputHandlers
                    }),
                    classAttr: 'form__group',
                    forAttr: 'phone',
                    error: 'phone',
                    labelText: 'Phone',
                }),
                inputPassword: new InputBlock({
                    input: new Input({
                        classAttr: 'form__input',
                        nameAttr: 'password',
                        placeholderAttr: '••••••••',
                        typeAttr: 'password',
                        valueAttr: '',
                        events: inputHandlers
                    }),
                    classAttr: 'form__group',
                    forAttr: 'password',
                    error: 'password',
                    labelText: 'Password',
                }),
                events: submitHandlerReg
            })
        }
    }

    protected componentDidMount(): void {
        this.element.setAttribute('class', 'container flex-center');
    }

    render() {
        return this.compile(template, this.props)
    }
}

export default RegPage;
