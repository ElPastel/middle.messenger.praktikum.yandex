import Block, { T } from '../../modules/block';
import template from './loginPage.pug';
import { withStore } from '../../modules/store';

class LoginPage extends Block<T> {
    constructor(props: T) {
        super(props, 'div');
    }

    render() {
        return this.compile(template(this.props), {
            classAttr: this.props.classAttr,
            content: this.props.content,
        })
    }
}

const withUser = withStore(state => ({ ...state.user }));
const LoginPageWithUser = withUser(LoginPage);

export default LoginPageWithUser;
