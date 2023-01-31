import Block from '../../modules/block';
import './error.scss'; 
import template from './error.pug';
import { Props } from '../../modules/types';

class Error extends Block<Props> {
    constructor(props: Props) {
        super('div', props);
    }

    render() {
        return this.compile(template(this.props), {
            button: this.props.button,
            errorNumber: this.props.errorNumber,
            errorText: this.props.errorText,
            class: this.props.class,
            events: this.props.events,
        });
    }
}

export default Error;
