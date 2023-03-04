import Block, {T} from '../../modules/block';
import './error.scss'; 
import template from './error.pug';

class Error extends Block<T> {
    constructor(props: T) {
        super(props, 'div');
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default Error;
