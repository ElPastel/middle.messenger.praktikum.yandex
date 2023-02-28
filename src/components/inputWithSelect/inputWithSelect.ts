import Block, { T } from '../../modules/block';
import './inputWithSelect.scss';
import template from './inputWithSelect.pug';
import store, { withStore } from '../../modules/store';

export class InputWithSelect extends Block<T> {
	constructor(props: T) {
		super(props, 'div');
	}

	protected init(): void {
		// console.log(store.getState());
		// console.log(this.props);
		
		// this.props.options = this.props.currentChatUsers.map(chat => chat.login);
		// console.log(this.props);
		
	}

	// protected componentDidUpdate(oldProps: T, newProps: T): boolean {
	// 	this.props.options = this.props.currentChatUsers.map(chat => chat.login);
	// 	console.log(this.props);

	// 	return true
	// }

	render() {
        return this.compile(template, this.props);
	}
}

const withChatUsers = withStore((state) => ({ currentChatUsers: state.currentChatUsers }));
const InputWithChatUsers = withChatUsers(InputWithSelect);

export default InputWithChatUsers;
