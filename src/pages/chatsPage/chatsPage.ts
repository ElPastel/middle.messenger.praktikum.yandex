import './chatsPage.scss';
import Button from '../../components/button/btn';
import template from './chatsPage.pug';
import Chats from '../../components/chats/chats';
import ChatMenu from '../../components/chatMenu/chatMenu';
import { addUserHandler, changeAvatarHandler, changePasswordHandler, closeModal, closeModalHandler, createNewChatHandler, deleteChatHandler, deleteUser, hideMenuHandler, logoutHandler, moreModalHandler } from '../../utils/handlers';
import router from '../../modules/router';
import ChatEmpty from '../../components/chatEmpty/chatEmpty';
import { Input } from '../../components/input/input';
import ChatSelectionWithChat from '../../components/chatSelection/chatSelection';
import MoreModal from '../../components/moreModal/moreModal';
import renderElement from '../../utils/renderElement';
import ModalForm from '../../components/modalForm/modalForm';
import messagesController from '../../controllers/messagesController';
import { withStore } from '../../modules/store';
import Block, { T } from '../../modules/block';
import ChatViewWithMessages from '../../components/chatView/chatView';
import chatsController from '../../controllers/chatsController';
import InputWithChatUsers from '../../components/inputWithSelect/inputWithSelect';
import { Routes } from '../..';

class ChatsPage extends Block<T> {
    constructor(props: T) {
        super(props, 'main');
    }

    protected init(): void {
        chatsController.getChats({});

        this.children.content = new Chats({
            sectionSelection: new ChatSelectionWithChat({
                classAttr: 'section__chat-selection',
                button: new Button({
                    classAttr: 'btn__menu',
                    route: '',
                    value: '',
                    icon: 'menu',
                    events: hideMenuHandler
                }),
                input: new Input({
                    classAttr: 'input__menu',
                    nameAttr: 'search',
                    placeholderAttr: 'Search',
                    typeAttr: 'text',
                    valueAttr: '',
                }),
            }),
            sectionView: new ChatViewWithMessages({
                classAttr: 'section__chat-view',
                buttonMore: new Button({
                    classAttr: 'btn__more',
                    route: '',
                    value: '',
                    icon: 'more_vert',
                    events: moreModalHandler
                }),
                moreModal: new MoreModal({
                    buttonAddUser: new Button({
                        classAttr: 'btn__more-modal',
                        linkColor: 'secondary',
                        value: 'Add user',
                        icon: 'person_add',
                        events: addUserHandler
                    }),
                    buttonDeleteUser: new Button({
                        classAttr: 'btn__more-modal',
                        linkColor: 'secondary',
                        value: 'Delete user',
                        icon: 'person_remove',
                        events: {
                            click: () => {
                                const modal = document.querySelector('.more-modal') as HTMLElement;
                                modal.classList.add('hidden');

                                const overlay = document.querySelector('.overlay');
                                overlay?.classList.remove('hidden');

                                renderElement('.main', new ModalForm({
                                    classAttr: 'form__box flex-form modal',
                                    buttonClose: new Button({
                                        classAttr: 'btn__close-modal',
                                        route: '',
                                        value: '',
                                        icon: 'close',
                                        events: closeModalHandler
                                    }),
                                    title: 'Delete user',
                                    formName: 'deleteuser',
                                    input: new InputWithChatUsers({
                                        options: this.props.currentChatUsers,
                                    }),
                                    buttonMain: new Button({
                                        classAttr: 'btn__main btn__deleteuser',
                                        value: 'Delete',
                                        linkColor: 'main',
                                    }),
                                    events: {
                                        submit: deleteUser
                                    }
                                }))

                                const focusEl: HTMLButtonElement | null = document.querySelector('.btn__deleteuser');
                                focusEl?.focus();
                                overlay?.addEventListener('click', () => closeModal());
                            }
                        }
                    }),
                    buttonDeleteChat: new Button({
                        classAttr: 'btn__more-modal',
                        linkColor: 'secondary',
                        value: 'Delete chat',
                        icon: 'chat_error',
                        events: deleteChatHandler
                    })
                }),
                buttonFile: new Button({
                    classAttr: 'btn__file',
                    route: '',
                    value: '',
                    icon: 'attach_file'
                }),
                buttonSend: new Button({
                    classAttr: 'btn__send',
                    route: '',
                    value: '',
                    icon: 'send',
                    typeAttr: 'submit',
                }),
                input: new Input({
                    classAttr: 'input__msg',
                    nameAttr: 'message',
                    placeholderAttr: 'Message',
                    typeAttr: 'text',
                    valueAttr: '',
                }),
                events: {
                    submit: (e: Event) => {
                        e.preventDefault();
                        const input: HTMLInputElement | null = document.querySelector('.input__msg');
                        if (input) {
                            const message = input.value;
                            input.value = '';
                            if (message) messagesController.sendMessage(this.props.currentChat as number, message);
                        }
                    }
                }
            }),
            sectionEmpty: new ChatEmpty({
                classAttr: 'section__chat-empty',
            }),
            chatMenu: new ChatMenu({
                classAttr: 'menu menu-hide',
                btnClose: new Button({
                    classAttr: 'btn__close',
                    route: '',
                    value: '',
                    icon: 'close',
                    events: hideMenuHandler
                }),
                avatar: '',
                displayName: '',
                btnProfile: new Button({
                    classAttr: 'btn__chatmenu',
                    linkColor: 'secondary',
                    route: '',
                    value: 'Profile',
                    icon: 'person_filled',
                    events: {
                        click: () => router.go(Routes.Profile)
                    }
                }),
                btnNewChat: new Button({
                    classAttr: 'btn__chatmenu',
                    linkColor: 'secondary',
                    route: '',
                    value: 'New chat',
                    icon: 'add',
                    events: createNewChatHandler
                }),
                btnChangeAvatar: new Button({
                    classAttr: 'btn__chatmenu',
                    linkColor: 'secondary',
                    route: '',
                    value: 'Change avatar',
                    icon: 'account_circle',
                    events: changeAvatarHandler
                }),
                btnChangePassword: new Button({
                    classAttr: 'btn__chatmenu',
                    linkColor: 'secondary',
                    route: '',
                    value: 'Change password',
                    icon: 'lock',
                    events: changePasswordHandler
                }),
                btnLogout: new Button({
                    classAttr: 'btn__chatmenu',
                    linkColor: 'secondary',
                    route: '',
                    value: 'Logout',
                    icon: 'logout',
                    events: logoutHandler
                }),
            }),
        })
    }

    render() {
        return this.compile(template, this.props)
    }
}

const withSelectedChatMessages = withStore((state) => {

    const currentChatUsers: string[] = state.currentChatUsers?.map((chat: Record<string, any>) => chat.login).filter((login: string) => login !== state.user.login)

    return {
        currentChat: state.currentChat,
        currentChatUsers: currentChatUsers || []
    }
}
);

export const ChatsPageWithSelectedChat = withSelectedChatMessages(ChatsPage);
export default ChatsPageWithSelectedChat;

