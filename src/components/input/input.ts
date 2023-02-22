import Block, { T } from '../../modules/block';
import './input.scss';
import template from './input.pug';
import { withStore } from '../../modules/store';

export class Input extends Block<T> {
	constructor(props: T) {
		super(props, 'input');		
	}

	render() {
		return this.compile(template(this.props), this.props);
	}
}

const withUser = withStore((state) => ({ valueAttr: state.user?.login }));
const InputWithUser = withUser(Input);

export default InputWithUser;
