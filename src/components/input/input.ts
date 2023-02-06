import Block, { T } from '../../modules/block';
import './input.scss';
import template from './input.pug';

class Input extends Block<T> {
	constructor(props: T) {
		super('input', props);
	}

	render() {
		return this.compile(template(this.props), {
			classAttr: this.props.classAttr,
			nameAttr: this.props.nameAttr,
			placeholderAttr: this.props.placeholderAttr,
			typeAttr: this.props.typeAttr,
			valueAttr: this.props.valueAttr,
			events: this.props.events
		});
	}
}

export default Input;
