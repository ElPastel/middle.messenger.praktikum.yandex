import Block, {T} from '../../modules/block';
import './registrationForm.scss';
import template from './registrationForm.pug';

class RegistrationForm extends Block<T> {
    constructor(props: T) {
        super(props, 'div');        
    }

    render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}

export default RegistrationForm;
