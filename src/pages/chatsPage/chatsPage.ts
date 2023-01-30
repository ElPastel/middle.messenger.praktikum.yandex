import './chatsPage.scss';
import Button from '../../components/button/btn';
import Input from '../../components/input/input';
import MessageBlock from '../../components/messageBlock/messageBlock';
import Chats from '../../components/chats/chats';
import ChatView from '../../components/chatView/chatView';
import ChatSelection from '../../components/chatSelection/chatSelection';

export const buttonMenu = new Button({
    class: 'btn__menu',
    route: '',
    value: '',
    icon: 'menu'
});

export const buttonMore = new Button({
    class: 'btn__more',
    route: '',
    value: '',
    icon: 'more_vert'
});

export const buttonFile = new Button({
    class: 'btn__file',
    route: '',
    value: '',
    icon: 'attach_file'
});

export const buttonSend = new Button({
    class: 'btn__send',
    route: '',
    value: '',
    icon: 'send'
});

const inputMenu = new Input({
    class: 'input__menu',
    nameAttr: 'search',
    placeholderAttr: 'Search',
    typeAttr: 'text',
    valueAttr: '',
});

const inputMsg = new Input({
    class: 'input__msg',
    nameAttr: 'message',
    placeholderAttr: 'Message',
    typeAttr: 'text',
    valueAttr: '',
});

const messageBlock1 = new MessageBlock({
    class: 'message-block',
    displayName: 'Michael Scott',
    lastMessage: 'No! God, please! NOOOO',
    messageDate: '12:45',
    newMessages: 3,
    hiddenClass: '',
    avatarSource: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABVElEQVR4nO2VvU4CQRSF56GoDBTG1gQTxJ/CgooECxMTirWwpCexorEwYucD4CNACyW4ZBUzZj2PcMnduAkQhQird0ZucZqZ2cn5zp67awCQzzLSBqAAkE8RWiHIJwkdYvgpI20ACgD5FKEVgnyS0CFGtsnE/S7ZTpvs0wPFg54/b+Dj7YUmrSuKgv058RrvOQ8w+cL8LITTAHG/+635VFnXyWR5me3crwTguVAA/FaFBj2/KwTfhxj/4TOKmTrxT8y7Hxn+WCbLy57DMd21H+n84pqK5Srld48SHZSryRrv8RnnAKx9p+bNLRX2jim3U1wqPsNn+Rm4ADAchXRWuVxpfFH8zHAUygJE0SuVTmo/Np/q8LSW3CEGUA8aa5tPVQ8acgCbms99SgGwrW8ADshIG4ACQD5FaIUgnyR0iOGnjLQBKADkU4RWCPJJQocY8mmuoymHavLA3Wry3QAAAABJRU5ErkJggg==',
});

const messageBlock2 = new MessageBlock({
    class: 'message-block',
    displayName: 'Dwight Schrute',
    lastMessage: 'I hate Jim',
    messageDate: '21:04',
    newMessages: 3,
    hiddenClass: '',
    avatarSource: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABVElEQVR4nO2VvU4CQRSF56GoDBTG1gQTxJ/CgooECxMTirWwpCexorEwYucD4CNACyW4ZBUzZj2PcMnduAkQhQird0ZucZqZ2cn5zp67awCQzzLSBqAAkE8RWiHIJwkdYvgpI20ACgD5FKEVgnyS0CFGtsnE/S7ZTpvs0wPFg54/b+Dj7YUmrSuKgv058RrvOQ8w+cL8LITTAHG/+635VFnXyWR5me3crwTguVAA/FaFBj2/KwTfhxj/4TOKmTrxT8y7Hxn+WCbLy57DMd21H+n84pqK5Srld48SHZSryRrv8RnnAKx9p+bNLRX2jim3U1wqPsNn+Rm4ADAchXRWuVxpfFH8zHAUygJE0SuVTmo/Np/q8LSW3CEGUA8aa5tPVQ8acgCbms99SgGwrW8ADshIG4ACQD5FaIUgnyR0iOGnjLQBKADkU4RWCPJJQocY8mmuoymHavLA3Wry3QAAAABJRU5ErkJggg==',
});

const messageBlock3 = new MessageBlock({
    class: 'message-block',
    displayName: 'Pam Beesly',
    lastMessage: 'Dunder Mifflin, this is Pam',
    messageDate: 'Mon',
    hiddenClass: '-hidden',
    avatarSource: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABVElEQVR4nO2VvU4CQRSF56GoDBTG1gQTxJ/CgooECxMTirWwpCexorEwYucD4CNACyW4ZBUzZj2PcMnduAkQhQird0ZucZqZ2cn5zp67awCQzzLSBqAAkE8RWiHIJwkdYvgpI20ACgD5FKEVgnyS0CFGtsnE/S7ZTpvs0wPFg54/b+Dj7YUmrSuKgv058RrvOQ8w+cL8LITTAHG/+635VFnXyWR5me3crwTguVAA/FaFBj2/KwTfhxj/4TOKmTrxT8y7Hxn+WCbLy57DMd21H+n84pqK5Srld48SHZSryRrv8RnnAKx9p+bNLRX2jim3U1wqPsNn+Rm4ADAchXRWuVxpfFH8zHAUygJE0SuVTmo/Np/q8LSW3CEGUA8aa5tPVQ8acgCbms99SgGwrW8ADshIG4ACQD5FaIUgnyR0iOGnjLQBKADkU4RWCPJJQocY8mmuoymHavLA3Wry3QAAAABJRU5ErkJggg==',
});


const sectionSelection = new ChatSelection({
    class: 'section__chat-selection',
    button: buttonMenu,
    input: inputMenu,
    messageBlock1: messageBlock1,
    messageBlock2: messageBlock2,
    messageBlock3: messageBlock3,
});

const sectionView = new ChatView({
    class: 'section__chat-view',
    buttonMore: buttonMore,
    buttonFile: buttonFile,
    buttonSend: buttonSend,
    input: inputMsg,
    displayName: 'Michael Scott'
});

const chats = new Chats({
    sectionSelection: sectionSelection,
    sectionView: sectionView,
});

const chatsPage = chats;

export default chatsPage;

