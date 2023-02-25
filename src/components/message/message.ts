import Block, {T} from '../../modules/block';
import './message.scss';
import template from './message.pug';

class Message extends Block<T> {
    constructor(props: T) {
        super(props, 'div');
    }

    render() {
        return this.compile(template, this.props)
    }
}

export default Message;
