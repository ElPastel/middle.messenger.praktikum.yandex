import Block, { T } from '../../modules/block';
import './input.scss';
import template from './input.pug';

class Input extends Block<T> {
	constructor(props: T) {
		super(props, 'input');
	}

	render() {
		return this.compile(template(this.props), this.props);
	}
}

export default Input;
