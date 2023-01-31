import Block from '../../modules/block';
import './messageBlock.scss';
import template from './messageBlock.pug';
import { Props } from '../../modules/types';

class MessageBlock extends Block<Props> {
	constructor(props: Props) {
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
