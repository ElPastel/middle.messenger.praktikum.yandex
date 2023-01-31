import Block from '../../modules/block';
import './chatEmpty.scss';
import template from './chatEmpty.pug';
import { Props } from '../../modules/types';

class ChatEmpty extends Block<Props> {
	constructor(props: Props) {
		super('section', props);
	}

	render() {
		return this.compile(template(this.props), {
			class: this.props.class,
		});
	}
}

export default ChatEmpty;
