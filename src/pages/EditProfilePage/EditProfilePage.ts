import Block, { T } from '../../modules/block';
import './EditProfilePage.scss';
import template from './EditProfilePage.pug';
import authController from '../../controllers/authController';
import store, { withStore } from '../../modules/store';
import editPageProps from './EditProfilePageProps';


class EditProfilePage extends Block<T> {
    constructor(props: T) {
        super(props, 'div');
    }

    protected init() {
        authController.fetchUser();
    }

    render() {
        return this.compile(template(this.props), this.props)
    }
}

const withUser = withStore((state) => ({ user: { ...(state.user || {}) } }));
const EditProfilePageWithUser = withUser(EditProfilePage);

export default EditProfilePageWithUser;

