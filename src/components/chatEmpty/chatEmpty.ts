import Block, {T} from '../../modules/block';
import './chatEmpty.scss';
import template from './chatEmpty.pug';

class ChatEmpty extends Block<T> {
	constructor(props: T) {
		super(props, 'section');
	}

	render() {
		return this.compile(template(this.props), {
			class: this.props.class,
		});
	}
}

export default ChatEmpty;
