import './chatsPage.scss';
import Button from '../../components/button/btn';
import Input from '../../components/input/input';
import MessageBlock from '../../components/messageBlock/messageBlock';
import Chats from '../../components/chats/chats';
import ChatView from '../../components/chatView/chatView';
import ChatSelection from '../../components/chatSelection/chatSelection';
import ChatMenu from '../../components/chatMenu/chatMenu';
import { changePasswordHandler, hideMenuHandler, logoutHandler } from '../../utils/handlers';
import router from '../../modules/router';

export const buttonMenu = new Button({
    classAttr: 'btn__menu',
    route: '',
    value: '',
    icon: 'menu',
    events: hideMenuHandler
});

export const buttonMore = new Button({
    classAttr: 'btn__more',
    route: '',
    value: '',
    icon: 'more_vert'
});

export const buttonFile = new Button({
    classAttr: 'btn__file',
    route: '',
    value: '',
    icon: 'attach_file'
});

export const buttonSend = new Button({
    classAttr: 'btn__send',
    route: '',
    value: '',
    icon: 'send'
});

const inputMenu = new Input({
    classAttr: 'input__menu',
    nameAttr: 'search',
    placeholderAttr: 'Search',
    typeAttr: 'text',
    valueAttr: '',
});

const inputMsg = new Input({
    classAttr: 'input__msg',
    nameAttr: 'message',
    placeholderAttr: 'Message',
    typeAttr: 'text',
    valueAttr: '',
});

const messageBlock1 = new MessageBlock({
    classAttr: 'message-block',
    displayName: 'Michael Scott',
    lastMessage: 'No! God, please! NOOOO',
    messageDate: '12:45',
    newMessages: 3,
    hiddenClass: '',
    avatarSource: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABVElEQVR4nO2VvU4CQRSF56GoDBTG1gQTxJ/CgooECxMTirWwpCexorEwYucD4CNACyW4ZBUzZj2PcMnduAkQhQird0ZucZqZ2cn5zp67awCQzzLSBqAAkE8RWiHIJwkdYvgpI20ACgD5FKEVgnyS0CFGtsnE/S7ZTpvs0wPFg54/b+Dj7YUmrSuKgv058RrvOQ8w+cL8LITTAHG/+635VFnXyWR5me3crwTguVAA/FaFBj2/KwTfhxj/4TOKmTrxT8y7Hxn+WCbLy57DMd21H+n84pqK5Srld48SHZSryRrv8RnnAKx9p+bNLRX2jim3U1wqPsNn+Rm4ADAchXRWuVxpfFH8zHAUygJE0SuVTmo/Np/q8LSW3CEGUA8aa5tPVQ8acgCbms99SgGwrW8ADshIG4ACQD5FaIUgnyR0iOGnjLQBKADkU4RWCPJJQocY8mmuoymHavLA3Wry3QAAAABJRU5ErkJggg==',
});

const messageBlock2 = new MessageBlock({
    classAttr: 'message-block',
    displayName: 'Dwight Schrute',
    lastMessage: 'I hate Jim',
    messageDate: '21:04',
    newMessages: 3,
    hiddenClass: '',
    avatarSource: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABVElEQVR4nO2VvU4CQRSF56GoDBTG1gQTxJ/CgooECxMTirWwpCexorEwYucD4CNACyW4ZBUzZj2PcMnduAkQhQird0ZucZqZ2cn5zp67awCQzzLSBqAAkE8RWiHIJwkdYvgpI20ACgD5FKEVgnyS0CFGtsnE/S7ZTpvs0wPFg54/b+Dj7YUmrSuKgv058RrvOQ8w+cL8LITTAHG/+635VFnXyWR5me3crwTguVAA/FaFBj2/KwTfhxj/4TOKmTrxT8y7Hxn+WCbLy57DMd21H+n84pqK5Srld48SHZSryRrv8RnnAKx9p+bNLRX2jim3U1wqPsNn+Rm4ADAchXRWuVxpfFH8zHAUygJE0SuVTmo/Np/q8LSW3CEGUA8aa5tPVQ8acgCbms99SgGwrW8ADshIG4ACQD5FaIUgnyR0iOGnjLQBKADkU4RWCPJJQocY8mmuoymHavLA3Wry3QAAAABJRU5ErkJggg==',
});

const messageBlock3 = new MessageBlock({
    classAttr: 'message-block',
    displayName: 'Pam Beesly',
    lastMessage: 'Dunder Mifflin, this is Pam',
    messageDate: 'Mon',
    hiddenClass: '-hidden',
    avatarSource: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABVElEQVR4nO2VvU4CQRSF56GoDBTG1gQTxJ/CgooECxMTirWwpCexorEwYucD4CNACyW4ZBUzZj2PcMnduAkQhQird0ZucZqZ2cn5zp67awCQzzLSBqAAkE8RWiHIJwkdYvgpI20ACgD5FKEVgnyS0CFGtsnE/S7ZTpvs0wPFg54/b+Dj7YUmrSuKgv058RrvOQ8w+cL8LITTAHG/+635VFnXyWR5me3crwTguVAA/FaFBj2/KwTfhxj/4TOKmTrxT8y7Hxn+WCbLy57DMd21H+n84pqK5Srld48SHZSryRrv8RnnAKx9p+bNLRX2jim3U1wqPsNn+Rm4ADAchXRWuVxpfFH8zHAUygJE0SuVTmo/Np/q8LSW3CEGUA8aa5tPVQ8acgCbms99SgGwrW8ADshIG4ACQD5FaIUgnyR0iOGnjLQBKADkU4RWCPJJQocY8mmuoymHavLA3Wry3QAAAABJRU5ErkJggg==',
});


export const sectionSelection = new ChatSelection({
    classAttr: 'section__chat-selection',
    button: buttonMenu,
    input: inputMenu,
    messageBlock1: messageBlock1,
    messageBlock2: messageBlock2,
    messageBlock3: messageBlock3,
});

export const sectionView = new ChatView({
    classAttr: 'section__chat-view',
    buttonMore: buttonMore,
    buttonFile: buttonFile,
    buttonSend: buttonSend,
    input: inputMsg,
    displayName: 'Michael Scott'
});

const buttonClose = new Button({
    classAttr: 'btn__close',
    route: '',
    value: '',
    icon: 'close',
    events: hideMenuHandler
});

const buttonProfile = new Button({
    classAttr: 'btn__chatmenu',
    linkColor: 'secondary',
    route: 'profile',
    value: 'Profile',
    icon: 'person_filled',
    events: {
        click: () => router.go('/profile')
    }
});

const buttonNewChat = new Button({
    classAttr: 'btn__chatmenu',
    linkColor: 'secondary',
    route: '',
    value: 'New chat',
    icon: 'add'
});

const buttonChangeAvatar = new Button({
    classAttr: 'btn__chatmenu',
    linkColor: 'secondary',
    route: '',
    value: 'Change avatar',
    icon: 'account_circle'
});

const buttonChangePassword = new Button({
    classAttr: 'btn__chatmenu',
    linkColor: 'secondary',
    route: '',
    value: 'Change password',
    icon: 'lock',
    events: changePasswordHandler
});

const buttonLogout = new Button({
    classAttr: 'btn__chatmenu',
    linkColor: 'secondary',
    route: '',
    value: 'Logout',
    icon: 'logout',
    events: logoutHandler
});

export const chatMenu = new ChatMenu({
    classAttr: 'menu menu-hide',
    btnClose: buttonClose,
    displayName: 'Ivan Ivanov',
    btnProfile: buttonProfile,
    btnNewChat: buttonNewChat,
    btnChangeAvatar: buttonChangeAvatar,
    btnChangePassword: buttonChangePassword,
    btnLogout: buttonLogout,
})

const chats = new Chats({
    sectionSelection: sectionSelection,
    sectionView: sectionView,
    chatMenu: chatMenu,
});

const chatsPage = chats;

export default chatsPage;

