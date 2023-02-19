import Block, { T } from '../../modules/block';
import './input.scss';
import template from './input.pug';
import { withStore } from '../../modules/store';

class Input extends Block<T> {
	constructor(props: T) {
		super(props, 'input');
	}

	protected init() {
		console.log(this.props);
	}

	render() {
		return this.compile(template(this.props), this.props);
	}
}

const withUser = withStore((state) => {
	return { valueAttr: state.user?.email }
})
export const InputWithUser = withUser(Input);

// export default InputWithUser;
export default Input;
