import Block from '../../modules/block';
import './inputBlock.scss';
import template from './inputBlock.pug';
import { Props } from '../../modules/types';

class InputBlock extends Block<Props> {
	constructor(props: Props) {
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
