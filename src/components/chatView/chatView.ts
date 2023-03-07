import Block, { T } from '../../modules/block/block';
import './chatView.scss';
import template from './chatView.pug';
import { withStore } from '../../modules/store';
import Message from '../message/message';

class ChatView extends Block<T> {
	constructor(props: T) {
		super(props, 'section');
	}

	protected init(): void {
		this.children.messages = this.createMessages(this.props);
	}

	protected componentDidUpdate(_: T, newProps: T): boolean {
		this.children.messages = this.createMessages(newProps);
		return true;
	}

	private createMessages(props: T) {
		return (props.messages as Record<string, any>[]).map(data => {
			return new Message({ ...data, isMine: props.userId === data.user_id });
		})
	}

	render() {
		return this.compile(template, this.props)
	}
}

const withCurrentChatMessages = withStore(state => {
	const currentChatId = state.currentChat;
	let chatTitle;
	let chatAvatar;
	if (state.chats) {
		const currentChatData = (state.chats.filter((chat: Record<string, unknown>) => chat.id === currentChatId))[0];
		if (currentChatData) {
			chatTitle = currentChatData.title;
			chatAvatar = currentChatData.avatar
		}
	}

	if (!currentChatId) {
		return {
			messages: [],
			currentChat: undefined,
			userId: state.user?.id,
			chatTitle: '',
			chatAvatar: null
		};
	}

	return {
		messages: (state.messages || {})[currentChatId] || [],
		currentChat: state.currentChat,
		userId: state.user.id,
		chatTitle: chatTitle,
		chatAvatar: chatAvatar
	};
});

export const ChatViewWithMessages = withCurrentChatMessages(ChatView);

export default ChatViewWithMessages;
