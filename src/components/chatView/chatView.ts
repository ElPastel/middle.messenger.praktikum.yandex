import Block, {T} from '../../modules/block';
import './chatView.scss';
import template from './chatView.pug';

class ChatView extends Block<T> {
	constructor(props: T) {
		super(props, 'section');
	}

	render() {
		return this.compile(template, this.props)
	}
}

export default ChatView;
