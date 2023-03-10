import Block, { T } from '../../modules/block/block';
import './message.scss';
import template from './message.pug';

class Message extends Block<T> {
    constructor(props: T) {
        super(props, 'div');
    }

    protected componentDidMount(): void {
        const msgClass = this.props.isMine ? 'text-box-mine' : 'text-box';
        this.element.setAttribute('class', msgClass);
    }

    render() {
        return this.compile(template, this.props)
    }
}

export default Message;
