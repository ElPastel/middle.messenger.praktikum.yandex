import Block, {T} from '../../modules/block';
import './moreModal.scss';
import template from './moreModal.pug';

export class MoreModal extends Block<T> {
    constructor(props: T) {
        super(props, 'div');
    }

    render() {
        return this.compile(template, this.props)
    }
}

export default MoreModal;
