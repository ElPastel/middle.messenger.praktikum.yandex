import Block, {T} from '../../modules/block';
import './chatSelection.scss';
import template from './chatSelection.pug';
import { withStore } from '../../modules/store';

class ChatSelection extends Block<T> {
	constructor(props: T) {
		super(props, 'section');
	}

	render() {
		return this.compile(template(this.props), this.props)
	}
}

const withChat = withStore((state) => ({ chats: state.chats}));
const ChatSelectionWithChat = withChat(ChatSelection);

export default ChatSelectionWithChat;
