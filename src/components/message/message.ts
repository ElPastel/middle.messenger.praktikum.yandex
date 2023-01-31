import Block from '../../modules/block';
import './message.scss';
import template from './message.pug';
import { Props } from '../../modules/types';

class Message extends Block<Props> {
    constructor(props: Props) {
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
