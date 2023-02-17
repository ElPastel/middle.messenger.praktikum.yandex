import Block, {T} from '../../modules/block';
import './btn.scss';
import template from './btn.pug';

class Button extends Block<T> {
	constructor(props: T) {
		super(props, 'button');
		if (this.element.classList.contains('btn__main')) this.element.setAttribute('type', 'submit');
	}

	render() {
		return this.compile(template(this.props), {});
	}
}

export default Button;
