import Block from '../../modules/block';
import './btn.scss';
import template from './btn.pug';

interface IButton {
	route?: string;
	value?: string;
	class?: string;
	linkColor?: string;
	icon?: string;
    events?: { [key: string]: (e: Event) => void };
}

class Button extends Block<IButton> {
	constructor(props: IButton) {
		super('button', props);
		if (this.element.classList.contains('btn__main')) this.element.setAttribute('type', 'submit');
	}

	render() {
		return this.compile(template(this.props), {});
	}
}

export default Button;
