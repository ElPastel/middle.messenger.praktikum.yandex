import Block, { T } from '../../modules/block';
import './registrationPage.scss';
import template from './registrationPage.pug';

class RegPage extends Block<T> {
    constructor(props: T) {
        super(props, 'div');
    }

    render() {
        return this.compile(template(this.props), {
            classAttr: this.props.classAttr,
            content: this.props.content,
        })
    }
}

export default RegPage;
