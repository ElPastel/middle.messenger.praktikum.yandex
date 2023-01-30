import Block from '../../modules/block';
import './layout.scss'; 
import layoutTmpl from './layout.pug';
import LoginForm from '../../components/loginForm/loginForm';
import RegistrationForm from '../../components/registrationForm/registrationForm';
import User from '../../components/user/user';
import Chats from '../../components/chatSelection/chatSelection';
import Error from '../../components/error/error';

interface ILayout {
	class?: string | string[];
	content: LoginForm | RegistrationForm | User | Chats | Error;
}

class Layout extends Block<ILayout> {
	constructor(props: ILayout) {
		super('div', props);
	}

	render(): DocumentFragment {
		return this.compile(layoutTmpl(), {
			class: this.props.class,
			content: this.props.content
		})
	}
}

export default Layout;