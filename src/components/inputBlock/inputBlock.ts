import Block, { T } from '../../modules/block';
import './inputBlock.scss';
import template from './inputBlock.pug';

class InputBlock extends Block<T> {
	constructor(props: T) {
		super('div', props);
	}

	render() {
		return this.compile(template(this.props), {
			input: this.props.input,
			forAttr: this.props.forAttr,
			labelText: this.props.labelText,
			class: this.props.class,
			events: this.props.events,
		});
	}
}

export default InputBlock;
