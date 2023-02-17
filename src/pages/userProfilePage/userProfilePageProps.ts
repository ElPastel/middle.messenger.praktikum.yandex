import { IUser } from '../../api/authApi';
import Button from '../../components/button/btn';
import User from '../../components/user/user';
import user from '../../user-data';


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


export const userData = function (user: IUser) {
    return new User({
        classAttr: 'form__box',
        displayName: user?.display_name,
        firstName: user?.first_name,
        secondName: user?.second_name,
        email: user?.email,
        login: user?.login,
        phone: user?.phone,
        buttonMain: buttonMain,
        buttonSecondary: buttonSecondary,
    })
}

export default function userProfilePageProps(user: IUser) {
     const page = {
        classAttr: 'container flex-center',
        content: new User({
            classAttr: 'form__box',
            displayName: user?.display_name ? user.display_name : '',
            firstName: user?.first_name ? user.first_name : '',
            secondName: user?.second_name ? user.second_name :'',
            email: user?.email ? user.email : '',
            login: user?.login ? user.login :'',
            phone: user?.phone ? user.phone :'',
            buttonMain: buttonMain,
            buttonSecondary: buttonSecondary,
        })
    }
    return page;
}

// export default userProfilePageProps(user);
