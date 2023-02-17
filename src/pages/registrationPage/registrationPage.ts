import Block, { T } from '../../modules/block';
import template from './registrationPage.pug';
import { withStore } from '../../modules/store';

class RegPage extends Block<T> {
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

const withUser = withStore((state) => ({ ...state.user }));
const RegPageWithUser = withUser(RegPage);

export default RegPageWithUser;
