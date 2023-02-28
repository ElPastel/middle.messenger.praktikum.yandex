import Block, {T} from '../../modules/block';
import './message.scss';
import template from './message.pug';

class Message extends Block<T> {
    constructor(props: T) {
        super(props, 'div');
        // this.props.classAttr = this.props.isMine ? 'text-box-mine': 'text-box'; 

    }

    protected componentDidMount(oldProps?: object | undefined): void {
        let msgClass = this.props.isMine ? 'text-box-mine' : 'text-box';
        this.element.setAttribute('class', msgClass);
    }

    render() {
        // debugger
        return this.compile(template, this.props)
    }
}

export default Message;
