import Block from '../../modules/block';
import './message.scss';
import template from './message.pug';

interface IMessage {
    class: string;
    msgText?: string;
    msgType: string;
    date: string
    events?: { [key: string]: (e: Event) => void };
}

class Message extends Block<IMessage> {
    constructor(props: IMessage) {
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