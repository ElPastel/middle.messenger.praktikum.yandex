import Block, { T } from '../../modules/block';
import './input.scss';
import { withStore } from '../../modules/store';

export class Input extends Block<T> {
	constructor(props: T) {
		super(props, 'input');
	}

	render() {
		return '';
	}
}

const withUser = withStore((state) => ({ valueAttr: state.user ? state.user?.login : '' }));
const InputWithUser = withUser(Input);

export default InputWithUser;
