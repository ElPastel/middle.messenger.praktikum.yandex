import Block, {T} from '../../modules/block';
import './registrationForm.scss';
import template from './registrationForm.pug';

class RegistrationForm extends Block<T> {
    constructor(props: T) {
        super(props, 'div');        
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
            events: this.props.events
        })
    }
}

export default RegistrationForm;
