import Block, {T} from '../../modules/block';
import './chats.scss';
import template from './chats.pug';

class Chats extends Block<T> {
    constructor(props: T) {
        super('div', props);
    }

    render() {
        return this.compile(template(this.props), {
            class: this.props.class,
            sectionSelection: this.props.sectionSelection,
            sectionView: this.props.sectionView,
        })
    }
}

export default Chats;
