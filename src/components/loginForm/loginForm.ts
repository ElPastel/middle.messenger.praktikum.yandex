import Block from '../../modules/block';
import './loginForm.scss';
import template from './loginForm.pug';
import { Props } from '../../modules/types';

class LoginForm extends Block<Props> {
    constructor(props: Props) {
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
