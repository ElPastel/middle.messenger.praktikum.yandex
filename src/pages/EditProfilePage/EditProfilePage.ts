import Block, { T } from '../../modules/block';
import './EditProfilePage.scss';
import template from './EditProfilePage.pug';
import authController from '../../controllers/authController';

class EditProfilePage extends Block<T> {
    constructor(props: T) {
        super(props, 'div');
    }

    protected init() {
        authController.fetchUser();
        // console.log(this.props);  
    }

    render() {
        return this.compile(template(this.props), {
            classAttr: this.props.classAttr,
            content: this.props.content,
        })
    }
}


export default EditProfilePage;
