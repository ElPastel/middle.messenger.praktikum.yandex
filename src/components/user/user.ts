import Block, { T } from '../../modules/block';
import './user.scss';
import template from './user.pug';
import store, { withStore } from '../../modules/store';

class User extends Block<T> {
    constructor(props: T) {
        super(props, 'div');
    }

    protected init(): void {
        console.log(this.props);
    }

    render(): DocumentFragment {
        return this.compile(template(), this.props)
    }
}

const withUser = withStore((state) => ({email: state.user?.email }));
const UserWithUser = withUser(User);


export default UserWithUser;
