import Block, { T } from '../../modules/block';
import './testBlock.scss';
import template from './testBlock.hbs';
import { withStore } from '../../modules/store';
import authController from '../../controllers/authController';

class TestBlock extends Block<T> {
    constructor(props: T) {
        super(props, 'div');
        // authController.fetchUser();
    }
    
    render() {
    
        return this.compile(template, this.props);
    }
}


const withUser = withStore((state) => ({ user: ({...state.user} || {}) }));
const TestBlockWithUser = withUser(TestBlock);

export default TestBlockWithUser;
