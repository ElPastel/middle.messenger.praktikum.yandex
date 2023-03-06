import Block, { T } from '../../modules/block/block';
import './inputWithSelect.scss';
import template from './inputWithSelect.pug';
import { withStore } from '../../modules/store';

export class InputWithSelect extends Block<T> {
	constructor(props: T) {
		super(props, 'div');
	}

	render() {
		return this.compile(template, this.props);
	}
}

const withChatUsers = withStore((state) => ({ currentChatUsers: state.currentChatUsers }));
const InputWithChatUsers = withChatUsers(InputWithSelect);

export default InputWithChatUsers;
