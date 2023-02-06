import Button from '../../components/button/btn';
import User from '../../components/user/user';
import Layout from '../layout/layout';
import userData from '../../user-data';

const buttonMain = new Button({
    classAttr: 'btn__main',
    route: 'edituser',
    value: 'Edit profile',
    linkColor: 'main'
});

const buttonSecondary = new Button({
    classAttr: 'btn__secondary',
    route: 'chats',
    value: 'Back to chats',
    linkColor: 'secondary'
});

const user = new User({
    classAttr: 'form__box',
    displayName: userData.display_name,
    firstName: userData.first_name,
    secondName: userData.second_name,
    email: userData.email,
    login: userData.login,
    phone: userData.phone,
    buttonMain: buttonMain,
    buttonSecondary: buttonSecondary,
});

const layout = new Layout({
    classAttr: 'container flex-center',
    content: user
})

const userProfilePage = layout;

export default userProfilePage;
