import Block, { T } from '../../modules/block/block';
import './chats.scss';
import template from './chats.pug';

class Chats extends Block<T> {
    constructor(props: T) {
        super(props, 'div');
    }

    render() {
        return this.compile(template, this.props)
    }
}

export default Chats;
