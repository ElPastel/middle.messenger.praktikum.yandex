import Block, { T } from '../../modules/block/block';
import './user.scss';
import template from './user.pug';

export class User extends Block<T> {
    constructor(props: T) {
        super(props, 'div');
    }

    render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}

export default User;
