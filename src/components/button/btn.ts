import Block from '../../modules/block';
import './btn.scss';
import template from './btn.pug';
import { Props } from '../../modules/types';

class Button extends Block<Props> {
	constructor(props: Props) {
		super('button', props);
		if (this.element.classList.contains('btn__main')) this.element.setAttribute('type', 'submit');
	}

	render() {
		return this.compile(template(this.props), {});
	}
}

export default Button;
