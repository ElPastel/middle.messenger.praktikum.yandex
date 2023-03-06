import Block, { T } from '../../modules/block/block';
import './changePasswordForm.scss';
import template from './changePasswordForm.pug';

export class ChangePasswordForm extends Block<T> {
    constructor(props: T) {
        super(props, 'div');
    }

    render() {
        return this.compile(template, this.props)
    }
}

export default ChangePasswordForm;
