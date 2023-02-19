import Block, { T } from '../../modules/block';
import './user.scss';
import template from './user.pug';
import store, { withStore } from '../../modules/store';

class User extends Block<T> {
    constructor(props: T) {
        super(props, 'div');
    }

    render(): DocumentFragment {
        return this.compile(template(), this.props)
    }
}

const withUser = withStore((state) => ({
    email: state.user?.email,
    login: state.user?.login,
    firstName: state.user?.first_name,
    secondName: state.user?.second_name,
    displayName: state.user?.display_name,
    phone: state.user?.phone,
}));
const UserWithUser = withUser(User);


export default UserWithUser;
