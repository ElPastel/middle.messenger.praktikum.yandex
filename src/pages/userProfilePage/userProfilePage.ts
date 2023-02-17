import Block, { T } from '../../modules/block';
import template from './userProfilePage.pug';
import { withStore } from '../../modules/store';
import authController from '../../controllers/authController';
import userProfilePageProps from './userProfilePageProps';
// import user from '../../user-data';

class UserProfilePage extends Block<T> {
    constructor(props: T) {
        super(props, 'div');
    }

    async componentDidMount() {
        // await authController.fetchUser();
        // console.log(this.props.user);


        // this.setProps(userProfilePageProps(user));
        // this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }

    render() {
        return this.compile(template(this.props), {
            classAttr: this.props.classAttr,
            content: this.props.content,
        })
    }
}

const withUser = withStore((state) => {
    const test = ({ ...state.user });
    console.log(test);
    return test;
});
const UserProfilePageWithUser = withUser(UserProfilePage);

export default UserProfilePageWithUser;
