import Button from '../../components/button/btn';
import { Input } from '../../components/input/input';
import InputBlock from '../../components/inputBlock/inputBlock';
import LoginForm from '../../components/loginForm/loginForm';
import Block, { T } from '../../modules/block';
import router from '../../modules/router';
import { inputHandlers, submitHandlerLog } from '../../utils/handlers';
import template from './loginPage.pug';

class LoginPage extends Block<T> {
    constructor(props: T) {
        super(props, 'div');
    }

    protected init(): void {
        this.children = {
            content: new LoginForm({
                classAttr: 'form__box flex-form signin',
                title: 'Sign in',
                buttonMain: new Button({
                    classAttr: 'btn__main',
                    route: 'chats',
                    value: 'Login',
                    linkColor: 'main',
                }),
                buttonSecondary: new Button({
                    classAttr: 'btn__secondary',
                    route: 'signup',
                    value: 'Create an account',
                    linkColor: 'secondary',
                    events: {
                        click: () => router.go('/signup')
                    }
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
                events: submitHandlerLog
            })
        }
    }

    protected componentDidMount(): void {
        this.element.setAttribute('class', 'container flex-center');
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default LoginPage;
