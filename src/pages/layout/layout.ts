import Block, {T} from '../../modules/block';
import './layout.scss'; 
import template from './layout.pug';

class Layout extends Block<T> {
	constructor(props: T) {
		super('div', props);
	}

	render(): DocumentFragment {
		return this.compile(template(), {
			class: this.props.class,
			content: this.props.content
		})
	}
}

export default Layout;
