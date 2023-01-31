import Block from '../../modules/block';
import './input.scss';
import template from './input.pug';
import { Props } from '../../modules/types';

class Input extends Block<Props> {
	constructor(props: Props) {
		super('input', props);
	}

	render() {
		return this.compile(template(this.props), {
			classAttr: this.props.classAttr,
			nameAttr: this.props.nameAttr,
			placeholderAttr: this.props.placeholderAttr,
			typeAttr: this.props.typeAttr,
			valueAttr: this.props.valueAttr,
		});
	}
}

export default Input;
