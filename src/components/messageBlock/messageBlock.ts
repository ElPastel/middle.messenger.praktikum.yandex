import Block from '../../modules/block';
import './messageBlock.scss';
import template from './messageBlock.pug';

interface IMessageBlock {
	class: string;
	displayName: string;
	lastMessage: string;
	messageDate: Date | string;
	newMessages?: number;
	avatarSource?: string;
	hiddenClass?: string;
	events?: { [key: string]: (e: Event) => void };
}

class MessageBlock extends Block<IMessageBlock> {
	constructor(props: IMessageBlock) {
		super('div', props);
	}

	render() {
		return this.compile(template(this.props), {
			class: this.props.class,
			displayName: this.props.displayName,
			lastMessage: this.props.lastMessage,
			messageDate: this.props.messageDate,
			newMessages: this.props.newMessages,
			avatarSource: this.props.avatarSource,
			hiddenClass: this.props.hiddenClass,
			events: this.props.events,
		});
	}
}

export default MessageBlock;