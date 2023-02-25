import Block, { T } from '../../modules/block';
import './inputBlock.scss';
import template from './inputBlock.pug';

class InputBlock extends Block<T> {
	constructor(props: T) {
		super(props, 'div');
		 
	}

	render() {
		
		return this.compile(template, this.props);
	}
}

export default InputBlock;
