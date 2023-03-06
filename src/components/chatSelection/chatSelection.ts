import Block, { T } from '../../modules/block/block';
import './chatSelection.scss';
import template from './chatSelection.pug';
import { withStore } from '../../modules/store';
import MessageBlock from '../messageBlock/messageBlock';
import chatsController from '../../controllers/chatsController';

export class ChatSelection extends Block<T> {
	constructor(props: T) {
		super(props, 'section');
	}

	protected init(): void {
		this.children.chats = this.makeChats(this.props);
	}

	protected componentDidUpdate(_: T, newProps: T): boolean {
		this.children.chats = this.makeChats(newProps);
		return true;
	}

	makeChats(props: T) {
		const chats = (props.chats as Record<string, any>[]).map((chat: Record<string, any>) => {
			const hours = new Date(chat.last_message?.time).getHours();
			const minutes = new Date(chat.last_message?.time).getMinutes();
			return {
				...chat,
				last_message: chat.last_message
					? { ...chat.last_message, time: `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}` }
					: null
			};
		});
		return chats.map((data: Record<string, any>) => {
			return new MessageBlock({
				...data, classAttr: 'message-block', events: {
					click: () => {
						chatsController.selectChat(data.id);
						chatsController.getUsersByChatId(data.id).then(res => console.log(res));
						(document.querySelector('.section__chat-empty') as HTMLElement).style.display = 'none';
						(document.querySelector('.section__chat-view') as HTMLElement).style.display = 'grid';

						const view: HTMLElement | null = document.querySelector('.chat-view');
						if (view) view.scrollTop = view.scrollHeight;
					}
				}
			})
		})
	}

	render() {
		return this.compile(template, this.props)
	}
}

const withChat = withStore((state) => ({ chats: [...(state.chats || [])] }));
const ChatSelectionWithChat = withChat(ChatSelection);

export default ChatSelectionWithChat;
