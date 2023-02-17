import Block, {T} from '../../modules/block';
import './user.scss';
import template from './user.pug';

class User extends Block<T> {
    constructor(props: T) {
        super(props, 'div');
    }
    render(): DocumentFragment {
        return this.compile(template(), {
            class: this.props.class,
            displayName: this.props.displayName,
            firstName: this.props.firstName,
            secondName: this.props.secondName,
            email: this.props.email,
            login: this.props.login,
            phone: this.props.phone,
            buttonMain: this.props.buttonMain,
            buttonSecondary: this.props.buttonSecondary,
        })
    }
}

export default User;
