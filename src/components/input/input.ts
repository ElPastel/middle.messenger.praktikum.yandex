import Block from '../../modules/block';
import './input.scss';
import template from './input.pug';

interface IInput {
	typeAttr: string;
	nameAttr: string;
	placeholderAttr: string;
	valueAttr?: string;
	class: string;
	events?: { [key: string]: (e: Event) => void };
  }

class Input extends Block<IInput> {
	constructor(props: IInput) {
		super('input', props);
	}

	render() {
		return this.compile(template(this.props), {});
	}

}

export default Input;
