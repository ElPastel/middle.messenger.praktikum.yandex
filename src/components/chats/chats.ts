import Block, {T} from '../../modules/block';
import './chats.scss';
import template from './chats.pug';

class Chats extends Block<T> {
    constructor(props: T) {
        super(props, 'div');
    }

    render() {
        return this.compile(template(this.props), {
            class: this.props.class,
            sectionSelection: this.props.sectionSelection,
            sectionView: this.props.sectionView,
            chatMenu: this.props.chatMenu,
        })
    }
}

export default Chats;
