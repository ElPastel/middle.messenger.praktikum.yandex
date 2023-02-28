import Block, { T } from '../../modules/block';
import './EditProfilePage.scss';
import template from './EditProfilePage.pug';
import { withStore } from '../../modules/store';
import RegistrationForm from '../../components/registrationForm/registrationForm';
import Button from '../../components/button/btn';
import router from '../../modules/router';
import InputBlock from '../../components/inputBlock/inputBlock';
import { Input } from '../../components/input/input';
import { editHandler, inputHandlers } from '../../utils/handlers';

interface IUser {
    login: string,
    email: string,
    first_name: string,
    second_name: string,
    display_name: string | null,
    phone: number
}

class EditProfilePage extends Block<T> {
    constructor(props: T) {
        super(props, 'div');
    }

    protected init(): void {
        this.children = {
            content: new RegistrationForm({
                classAttr: 'form__box form__ediprofile',
                title: 'Edit profile',
                buttonMain: new Button({
                    classAttr: 'btn__main',
                    route: 'user',
                    value: 'Save',
                    linkColor: 'main'
                }),
                buttonSecondary: new Button({
                    classAttr: 'btn__secondary',
                    route: 'chats',
                    value: 'Back to chats',
                    linkColor: 'secondary',
                    events: {
                        click: () => router.go('/chats')
                    }
                }),
                inputEmail: new InputBlock({
                    input: new Input({
                        classAttr: 'form__input',
                        idAttr: 'email',
                        nameAttr: 'email',
                        placeholderAttr: 'pochta@yandex.ru',
                        typeAttr: 'email',
                        valueAttr: this.props.user ? (this.props.user as unknown as IUser).email : '',
                        events: inputHandlers
                    }),
                    classAttr: 'form__group',
                    forAttr: 'email',
                    labelText: 'E-mail',
                }),
                inputLogin: new InputBlock({
                    input: new Input({
                        classAttr: 'form__input',
                        nameAttr: 'login',
                        placeholderAttr: 'IvanIvanov001',
                        typeAttr: 'text',
                        valueAttr: this.props.user ? (this.props.user as unknown as IUser).login : '',
                        events: inputHandlers
                    }),
                    classAttr: 'form__group',
                    labelText: 'Login',
                    forAttr: 'login',
                }),
                inputFirstName: new InputBlock({
                    input: new Input({
                        classAttr: 'form__input',
                        nameAttr: 'first_name',
                        placeholderAttr: 'Ivan',
                        typeAttr: 'text',
                        valueAttr: this.props.user ? (this.props.user as unknown as IUser).first_name : '',
                        events: inputHandlers
                    }),
                    classAttr: 'form__group',
                    forAttr: 'first_name',
                    labelText: 'Name',
                }),
                inputSecondName: new InputBlock({
                    input: new Input({
                        classAttr: 'form__input',
                        nameAttr: 'second_name',
                        placeholderAttr: 'Ivanov',
                        typeAttr: 'text',
                        valueAttr: this.props.user ? (this.props.user as unknown as IUser).second_name : '',
                        events: inputHandlers
                    }),
                    classAttr: 'form__group',
                    forAttr: 'second_name',
                    labelText: 'Last name',
                }),
                inputDisplayName: new InputBlock({
                    input: new Input({
                        classAttr: 'form__input',
                        nameAttr: 'display_name',
                        placeholderAttr: 'MyName',
                        typeAttr: 'text',
                        valueAttr: this.props.user ? (this.props.user as unknown as IUser).display_name! : '',
                        events: inputHandlers
                    }),
                    classAttr: 'form__group',
                    forAttr: 'display_name',
                    labelText: 'Display name',
                }),
                inputPhone: new InputBlock({
                    input: new Input({
                        classAttr: 'form__input',
                        nameAttr: 'phone',
                        placeholderAttr: '89091234567',
                        typeAttr: 'tel',
                        valueAttr: this.props.user ? (this.props.user as unknown as IUser).phone : '',
                        events: inputHandlers
                    }),
                    classAttr: 'form__group',
                    forAttr: 'phone',
                    labelText: 'Phone',
                }),
                events: editHandler
            })
        }
    }

    render() {
        return this.compile(template, this.props)
    }
}

const withUser = withStore((state) => ({ user: { ...(state.user || {}) } }));
const EditProfilePageWithUser = withUser(EditProfilePage);

export default EditProfilePageWithUser;

