import Block from '../../modules/block';
import './chatEmpty.scss';
import template from './chatEmpty.pug';

interface IChatEmpty {
    class: string;
 }

class ChatEmpty extends Block<IChatEmpty> {
	constructor(props: IChatEmpty) {
		super('section', props);
	}

	render() {
		return this.compile(template(this.props), {
			class: this.props.class,
		});
	}
}

export default ChatEmpty;