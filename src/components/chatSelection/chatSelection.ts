import Block, {T} from '../../modules/block';
import './chatSelection.scss';
import template from './chatSelection.pug';

class ChatSelection extends Block<T> {
	constructor(props: T) {
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
