import Block from '../../modules/block';
import './user.scss'; 
import template from './user.pug';
import Button from '../button/btn';

interface IUser {
    class?: string;
    displayName: string;
    firstName: string;
    secondName: string;
    email: string;
    login: string;
    phone: string;
    buttonMain: Button;
    buttonSecondary: Button;
    events?: { [key: string]: (e: Event) => void };
}

class User extends Block<IUser> {
    constructor(props: IUser) {
        super('div', props);
    }
    render(): DocumentFragment {
        return this.compile(template(), {
            class: this.props.class,
            displayName: this.props.displayName,
            firstName: this.props.firstName,
            secondName: this.props.secondName,
            email: this.props.email,
            login: this.props.login,
            phone: this.props.phone,
            buttonMain: this.props.buttonMain,
            buttonSecondary: this.props.buttonSecondary,
        })
    }
}

export default User;
