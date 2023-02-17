import Block, {T} from '../../modules/block';
import './chatView.scss';
import template from './chatView.pug';

class ChatView extends Block<T> {
	constructor(props: T) {
		super(props, 'section');
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
