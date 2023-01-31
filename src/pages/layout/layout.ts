import Block from '../../modules/block';
import './layout.scss'; 
import template from './layout.pug';
import { Props } from '../../modules/types';

class Layout extends Block<Props> {
	constructor(props: Props) {
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
