import Button from "../../components/button/btn";
import Error from "../../components/error/error";
import Block, { T } from '../../modules/block';
import './errorPage500.scss';
import template from './errorPage500.pug';
import router from "../../modules/router";


class ErrorPage500 extends Block<T> {
    constructor(props: T) {
        super(props, 'div');
    }

    protected init(): void {
        this.children = {
            content: new Error({
                classAttr: 'error container flex-center',
                button: new Button({
                    classAttr: 'btn__secondary',
                    route: '',
                    value: 'Back to homepage',
                    linkColor: 'secondary',
                    events: {
                        click: () => router.go('/chats'),
                    }
                }),
                errorNumber: 500,
                errorText: 'Oops! something went wrong.',
            })
        }
    }

    protected componentDidMount(): void {
        this.element.setAttribute('class', 'container flex-center');
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default ErrorPage500;
