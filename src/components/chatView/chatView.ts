import Block from '../../modules/block';
import './chatView.scss';
import template from './chatView.pug';
import Button from '../button/btn';
import Input from '../input/input';

interface IChatView {
    class: string;
	buttonMore: Button;
	buttonFile: Button;
	buttonSend: Button;
	input: Input;
	displayName: string;
	avatar?: string;
	events?: { [key: string]: (e: Event) => void };
  }

class ChatView extends Block<IChatView> {
	constructor(props: IChatView) {
		super('section', props);
	}

	render() {
		return this.compile(template(this.props), {
            class: this.props.class,
            buttonMore: this.props.buttonMore,
            buttonFile: this.props.buttonFile,
            buttonSend: this.props.buttonSend,
            input: this.props.input,
            displayName: this.props.displayName,
            avatar: this.props.avatar,
        })
	}
}

export default ChatView;