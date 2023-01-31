import Block from '../../modules/block';
import './registrationForm.scss';
import template from './registrationForm.pug';
import { Props } from '../../modules/types';

class RegistrationForm extends Block<Props> {
    constructor(props: Props) {
        super('div', props);
    }

    render(): DocumentFragment {
        return this.compile(template(), {
            classAttr: this.props.class,
            title: this.props.title,
            buttonMain: this.props.buttonMain,
            buttonSecondary: this.props.buttonSecondary,
            inputEmail: this.props.inputEmail,
            inputLogin: this.props.inputLogin,
            inputFirstName: this.props.inputFirstName,
            inputSecondName: this.props.inputSecondName,
            inputPhone: this.props.phone,
            inputPassword: this.props.inputPassword,
        })
    }
}

export default RegistrationForm;
