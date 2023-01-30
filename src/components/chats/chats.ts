import Block from '../../modules/block';
import './chats.scss';
import template from './chats.pug';
import ChatSelection from '../chatSelection/chatSelection';
import ChatView from '../chatView/chatView';
import ChatEmpty from '../chatEmpty/chatEmpty';

interface IChats {
    class?: string;
    sectionSelection: ChatSelection;
    sectionView: ChatView | ChatEmpty;
}

class Chats extends Block<IChats> {
    constructor(props: IChats) {
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