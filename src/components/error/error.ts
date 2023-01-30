import Block from '../../modules/block';
import './error.scss'; // .error.container.flex-center
import template from './error.pug';
import Button from '../button/btn';

interface IIError {
    button: Button;
    errorNumber: number;
    errorText: string;
    class?: string | string[];
    events?: { [key: string]: (e: Event) => void };
}

class Error extends Block<IIError> {
    constructor(props: IIError) {
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
