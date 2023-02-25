import Block, { T } from '../../modules/block';
import template from './loginPage.pug';

class LoginPage extends Block<T> {
    constructor(props: T) {
        super(props, 'div');
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default LoginPage;
