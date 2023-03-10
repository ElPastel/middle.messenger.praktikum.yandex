import Block, { T } from '../../modules/block/block';
import './chatEmpty.scss';
import template from './chatEmpty.pug';

class ChatEmpty extends Block<T> {
	constructor(props: T) {
		super(props, 'section');
	}

	render() {
		return this.compile(template, this.props);
	}
}

export default ChatEmpty;
