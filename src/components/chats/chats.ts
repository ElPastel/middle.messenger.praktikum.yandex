import Block from '../../modules/block';
import './chats.scss';
import template from './chats.pug';
import { Props } from '../../modules/types';

class Chats extends Block<Props> {
    constructor(props: Props) {
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
