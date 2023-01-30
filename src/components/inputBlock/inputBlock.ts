import Block from '../../modules/block';
import './inputBlock.scss';
import template from './inputBlock.pug';
import Input from '../input/input';

interface IInputBlock {
	input: Input;
	forAttr: string;
	labelText: string;
	class?: string;
	events?: { [key: string]: (e: Event) => void };
  }

class InputBlock extends Block<IInputBlock> {
	constructor(props: IInputBlock) {
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
