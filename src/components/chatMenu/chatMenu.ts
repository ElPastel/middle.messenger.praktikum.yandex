import Block, {T} from '../../modules/block';
import './chatMenu.scss';
import template from './chatMenu.pug';

class ChatMenu extends Block<T> {
    constructor(props: T) {
        super(props, 'nav');
    }
    render(): DocumentFragment {
        return this.compile(template(), {
            class: this.props.class,
            icon: this.props.icon,
            displayName: this.props.displayName,
            btnProfile: this.props.btnProfile,
            btnNewChat: this.props.btnNewChat,
            btnChangeAvatar: this.props.btnChangeAvatar,
            btnChangePassword: this.props.btnChangePassword,
            btnLogout: this.props.btnLogout
        })
    }
}

export default ChatMenu;
