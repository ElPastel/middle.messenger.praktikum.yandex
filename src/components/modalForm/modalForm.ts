import Block, { T } from '../../modules/block/block';
import './modalForm.scss';
import template from './modalForm.pug';

export class ModalForm extends Block<T> {
    constructor(props: T) {
        super(props, 'div');
    }

    render() {
        return this.compile(template, this.props)
    }
}

export default ModalForm;
