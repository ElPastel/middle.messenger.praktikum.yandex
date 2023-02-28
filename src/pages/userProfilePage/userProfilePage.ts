import Block, { T } from '../../modules/block';
import template from './userProfilePage.pug';
import { withStore } from '../../modules/store';

class UserProfilePage extends Block<T> {
    constructor(props: T) {
        super(props, 'div');
    }

    render() {
        return this.compile(template, this.props)
    }
}

const withUser = withStore((state) => ({ user: { ...(state.user || {}) } }));
const UserProfilePageWithUser = withUser(UserProfilePage);

export default UserProfilePageWithUser;
