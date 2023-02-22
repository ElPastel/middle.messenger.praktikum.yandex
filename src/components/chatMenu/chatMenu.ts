import Block, {T} from '../../modules/block';
import './chatMenu.scss';
import template from './chatMenu.pug';
import { withStore } from '../../modules/store';
import authController from '../../controllers/authController';

class ChatMenu extends Block<T> {
    constructor(props: T) {
        super(props, 'nav');
    }

    protected init(): void {
        authController.fetchUser();
    }

    render(): DocumentFragment {
        return this.compile(template(), this.props)
    }
}

const withUser = withStore((state) => ({
    avatar: state.user?.avatar,
    displayName: state.user?.display_name,
}));
const ChatMenuWithUser = withUser(ChatMenu);

export default ChatMenuWithUser;
