import Block, {T} from '../../modules/block';
import './layout.scss'; 
import template from './layout.pug';

class Layout extends Block<T> {
	constructor(props: T) {
		super(props, 'div');
	}

	render(): DocumentFragment {
		return this.compile(template, this.props)
	}
}

export default Layout;
