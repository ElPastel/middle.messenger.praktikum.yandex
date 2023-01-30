import Block from '../../modules/block';
import './registrationForm.scss'; 
import template from './registrationForm.pug';
import Button from '../button/btn';
import InputBlock from '../inputBlock/inputBlock';

interface IRegistrationForm {
    class: string;
    title: string;
    buttonMain: Button;
    buttonSecondary: Button;
    inputEmail: InputBlock;
    inputLogin: InputBlock;
    inputFirstName: InputBlock;
    inputSecondName: InputBlock;
    inputPhone: InputBlock;
    inputPassword?: InputBlock;
    events?: { [key: string]: (e: Event) => void };
}

class RegistrationForm extends Block<IRegistrationForm> {
    constructor(props: IRegistrationForm) {
        super('div', props);
    }

    render(): DocumentFragment {
        return this.compile(template(), {
            class: this.props.class,
            title: this.props.title,
            buttonMain: this.props.buttonMain,
            buttonSecondary: this.props.buttonSecondary,
            inputEmail: this.props.inputEmail,
            inputLogin: this.props.inputLogin,
            inputFirstName: this.props.inputFirstName,
            inputSecondName: this.props.class.inputSecondName,
            inputPhone: this.props.phone,
            inputPassword: this.props.inputPassword,
        })
    }
}

export default RegistrationForm;
