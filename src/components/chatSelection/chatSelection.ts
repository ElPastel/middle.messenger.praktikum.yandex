import Block from '../../modules/block';
import './chatSelection.scss';
import template from './chatSelection.pug';
import Button from '../button/btn';
import Input from '../input/input';
import MessageBlock from '../messageBlock/messageBlock';

interface IChatSelection {
	class: string;
	button: Button;
	input: Input;
	messageBlock1: MessageBlock;
	messageBlock2: MessageBlock;
	messageBlock3: MessageBlock;
	events?: { [key: string]: (e: Event) => void };
  }

class ChatSelection extends Block<IChatSelection> {
	constructor(props: IChatSelection) {
		super('section', props);
	}

	render() {
		return this.compile(template(this.props), {
			class: this.props.class,
            button: this.props.button,
            input: this.props.input,
            messageBlock1: this.props.messageBlock1,
            messageBlock2: this.props.messageBlock2,
            messageBlock3: this.props.messageBlock3,
		})
	}
}

export default ChatSelection;
