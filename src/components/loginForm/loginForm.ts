import Block, {T} from '../../modules/block';
import './loginForm.scss';
import template from './loginForm.pug';

class LoginForm extends Block<T> {
    constructor(props: T) {
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
