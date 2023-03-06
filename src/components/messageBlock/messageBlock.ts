import Block, { T } from '../../modules/block/block';
import './messageBlock.scss';
import template from './messageBlock.pug';

class MessageBlock extends Block<T> {
	constructor(props: T) {
		super(props, 'div');
	}

	render() {
		return this.compile(template, this.props);
	}
}

export default MessageBlock;
