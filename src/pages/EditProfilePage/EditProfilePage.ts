import Block, { T } from '../../modules/block';
import './EditProfilePage.scss';
import template from './EditProfilePage.pug';
import authController from '../../controllers/authController';
import store, { withStore } from '../../modules/store';


class EditProfilePage extends Block<T> {
    constructor(props: T) {
        super(props, 'div');
    }

    protected init() {
        authController.fetchUser();
        const userdata = store.getState();
        // console.log(userdata);        
        // console.log(this.props.user);  
    }

    render() {
        return this.compile(template(this.props), {
            classAttr: this.props.classAttr,
            content: this.props.content,
        })
    }
}
const withUser = withStore((state) => ({ user: { ...(state.user || {}) } }));
const EditProfilePageWithUser = withUser(EditProfilePage);

export default EditProfilePageWithUser;

// export default EditProfilePage;
