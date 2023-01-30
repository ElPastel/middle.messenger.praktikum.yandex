import Block from '../../modules/block';
import './loginForm.scss';
import template from './loginForm.pug';
import Button from '../button/btn';
import InputBlock from '../inputBlock/inputBlock';

interface ILoginForm {
    class: string[];
    title: string;
    buttonMain: Button;
    buttonSecondary: Button;
    inputLogin: InputBlock;
    inputPassword: InputBlock;
    events?: { [key: string]: (e: Event) => void };
}

class LoginForm extends Block<ILoginForm> {
    constructor(props: ILoginForm) {
        super('div', props);
    }

    render() {
        return this.compile(template(this.props), {
            class: this.props.class,
            title: this.props.title
        })
    }
}

export default LoginForm;
