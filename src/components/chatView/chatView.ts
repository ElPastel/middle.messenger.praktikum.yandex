import Block from '../../modules/block';
import './chatView.scss';
import template from './chatView.pug';
import { Props } from '../../modules/types';

class ChatView extends Block<Props> {
	constructor(props: Props) {
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
