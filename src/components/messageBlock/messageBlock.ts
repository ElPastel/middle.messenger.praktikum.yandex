import Block, {T} from '../../modules/block';
import './messageBlock.scss';
import template from './messageBlock.pug';

class MessageBlock extends Block<T> {
	constructor(props: T) {
		super(props, 'div');
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
