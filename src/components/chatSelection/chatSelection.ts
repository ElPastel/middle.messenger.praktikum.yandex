import Block, { T } from '../../modules/block';
import './chatSelection.scss';
import template from './chatSelection.pug';
import store, { withStore } from '../../modules/store';
import MessageBlock from '../messageBlock/messageBlock';
import chatsController from '../../controllers/chatsController';
import { Input } from '../input/input';

export class ChatSelection extends Block<T> {
	constructor(props: T) {
		// debugger
		super(props, 'section');
	}

	protected init(): void {
		this.children.chats = this.makeChats(this.props);
	}

	protected componentDidUpdate(oldProps: T, newProps: T): boolean {
		this.children.chats = this.makeChats(newProps);
		return true;
	}

	makeChats(props: T) {
		const chats = props.chats.map((chat) => {
			const hours = new Date(chat.last_message?.time).getHours();
			const minutes = new Date(chat.last_message?.time).getMinutes();
			return {
				...chat,
				last_message: chat.last_message
					? { ...chat.last_message, time: `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}` }
					: null
			};
		});
		return chats.map((data) => {
			return new MessageBlock({...data, classAttr: 'message-block', events: {
				click: (e: Event) => {
					console.log('click chat');	
					chatsController.selectChat(data.id);
					(document.querySelector('.section__chat-empty') as HTMLElement).style.display = 'none';
					(document.querySelector('.section__chat-view') as HTMLElement).style.display = 'grid';
				}
			}})
		})
	}

	render() {
		return this.compile(template, this.props)
	}
}

const withChat =  withStore((state) => ({chats: [...(state.chats || [])]}));
const ChatSelectionWithChat = withChat(ChatSelection);

export default ChatSelectionWithChat;
