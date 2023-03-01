import Block, { T } from '../../modules/block';
import template from './userProfilePage.pug';
import { withStore } from '../../modules/store';
import Button from '../../components/button/btn';
import router from '../../modules/router';
import User from '../../components/user/user';
import { Routes } from '../..';

interface IUser {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    avatar: string,
    email: string,
    phone: number | string
}

class UserProfilePage extends Block<T> {
    constructor(props: T) {
        super(props, 'main');
    }

    protected init(): void {
        this.children = {
            content: new User({
                classAttr: 'form__box',
                avatar: (this.props.user as unknown as IUser)?.avatar || '',
                email: (this.props.user as unknown as IUser)?.email || '',
                login: (this.props.user as unknown as IUser)?.login || '',
                firstName: (this.props.user as unknown as IUser)?.first_name || '',
                secondName: (this.props.user as unknown as IUser)?.second_name || '',
                displayName: (this.props.user as unknown as IUser)?.display_name || '',
                phone: (this.props.user as unknown as IUser)?.phone || '',
                buttonMain: new Button({
                    classAttr: 'btn__main',
                    route: '',
                    value: 'Edit profile',
                    linkColor: 'main',
                    events: {
                        click: () => router.go(Routes.Edit)
                    }
                }),
                buttonSecondary: new Button({
                    classAttr: 'btn__secondary',
                    route: '',
                    value: 'Back to chats',
                    linkColor: 'secondary',
                    events: {
                        click: () => router.go(Routes.Chats)
                    }
                }),
        })
    }}


    protected componentDidMount(): void {
        this.element.setAttribute('class', 'container flex-center');
    }

    render() {
        return this.compile(template, this.props)
    }
}

const withUser = withStore((state) => ({ user: { ...(state.user || {}) } }));
const UserProfilePageWithUser = withUser(UserProfilePage);

export default UserProfilePageWithUser;
