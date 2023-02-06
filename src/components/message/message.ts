import Block, {T} from '../../modules/block';
import './message.scss';
import template from './message.pug';

class Message extends Block<T> {
    constructor(props: T) {
        super('div', props);
    }

    render() {
        return this.compile(template(this.props), {
            class: this.props.class,
            date: this.props.date,
            msgText: this.props.msgText,
            events: this.props.events,
        })
    }
}

export default Message;
