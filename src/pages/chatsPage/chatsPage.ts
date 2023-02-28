import './chatsPage.scss';
import Button from '../../components/button/btn';
import template from './chatsPage.pug';
import Chats from '../../components/chats/chats';
import ChatMenu from '../../components/chatMenu/chatMenu';
import { addUser, changeAvatarHandler, changePasswordHandler, closeModal, closeModalHandler, createNewChatHandler, deleteUser, hideMenuHandler, inputHandlers, logoutHandler } from '../../utils/handlers';
import router from '../../modules/router';
import ChatEmpty from '../../components/chatEmpty/chatEmpty';
import { Input } from '../../components/input/input';
import ChatSelectionWithChat from '../../components/chatSelection/chatSelection';
import MoreModal from '../../components/moreModal/moreModal';
import renderElement from '../../utils/renderElement';
import ModalForm from '../../components/modalForm/modalForm';
import InputBlock from '../../components/inputBlock/inputBlock';
import messagesController from '../../controllers/messagesController';
import store, { withStore } from '../../modules/store';
import Block, { T } from '../../modules/block';
import ChatViewWithMessages from '../../components/chatView/chatView';
import chatsController from '../../controllers/chatsController';
import InputWithChatUsers from '../../components/inputWithSelect/inputWithSelect';

class ChatsPage extends Block<T> {
    constructor(props: T) {
        super(props, 'div');
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
                    events: {
                        click: () => {
                            const modal = document.querySelector('.more-modal') as HTMLElement;
                            modal.classList.toggle('hidden');
                        }
                    }
                }),
                moreModal: new MoreModal({
                    buttonAddUser: new Button({
                        classAttr: 'btn__more-modal',
                        linkColor: 'secondary',
                        value: 'Add user',
                        icon: 'person_add',
                        events: {
                            click: (e: Event) => {
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
                                    title: 'Select user',
                                    formName: 'adduser',
                                    errorText: 'User not found',
                                    input: new InputBlock({
                                        input: new Input({
                                            classAttr: 'form__input',
                                            nameAttr: 'login',
                                            placeholderAttr: 'IvanIvanov001',
                                            typeAttr: 'text',
                                            valueAttr: '',
                                            events: inputHandlers
                                        }),
                                        classAttr: 'form__group',
                                        forAttr: 'login',
                                        labelText: 'User login',
                                    }),
                                    buttonMain: new Button({
                                        classAttr: 'btn__main btn__adduser',
                                        value: 'Add',
                                        linkColor: 'main',
                                    }),
                                    events: {
                                        submit: addUser
                                    }
                                }))

                                const focusEl: HTMLButtonElement | null = document.querySelector('.btn__adduser');
                                focusEl?.focus();
                                overlay?.addEventListener('click', () => closeModal());
                            }
                        }
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
                                    // errorText: 'User not found',
                                    // input: new InputWithSelect({
                                    //     // classAttr: 'form__group',
                                    //     // forAttr: 'login',
                                    //     // labelText: 'User login',
                                    // }),
                                    buttonMain: new Button({
                                        classAttr: 'btn__main btn__deleteuser',
                                        value: 'Delete',
                                        linkColor: 'main',
                                    }),
                                    events: {
                                        submit: addUser
                                    }
                                }))

                                const focusEl: HTMLButtonElement | null = document.querySelector('.btn__deleteuser');
                                focusEl?.focus();
                                overlay?.addEventListener('click', () => closeModal());
                            }
                        }
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
                    events: {
                        click: () => {
                            const input: HTMLInputElement | null = document.querySelector('.input__msg');
                            if (input) {
                                const message = input?.value;
                                console.log(message);
                                input.value = '';
                                messagesController.sendMessage(this.props.currentChat, message);
                            }
                        }
                    }
                }),
                input: new Input({
                    classAttr: 'input__msg',
                    nameAttr: 'message',
                    placeholderAttr: 'Message',
                    typeAttr: 'text',
                    valueAttr: '',
                }),
                // chatTitle: ''
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
                avatar: null,
                displayName: null,
                btnProfile: new Button({
                    classAttr: 'btn__chatmenu',
                    linkColor: 'secondary',
                    route: 'profile',
                    value: 'Profile',
                    icon: 'person_filled',
                    events: {
                        click: () => router.go('/profile')
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


// const withCurrentChatMessages = withStore(state => {
// 	const currentChatId = state.currentChat;
// 	let chatTitle;
// 	if (state.chats) {
// 		const currentChatData = (state.chats?.filter(chat => chat.id === currentChatId))[0];
// 		if (currentChatData) chatTitle = currentChatData.title
// 		console.log(chatTitle);
// 	}
// 	if (!currentChatId) {
// 		return {
// 			messages: [],
// 			currentChat: undefined,
// 			userId: state.user?.id
// 		};
// 	}

// 	return {
// 		messages: (state.messages || {})[currentChatId] || [],
// 		currentChat: state.currentChat,
// 		userId: state.user.id,
// 		chatTitle: chatTitle,
// 	};
// });

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









// export const buttonMenu = new Button({
//     classAttr: 'btn__menu',
//     route: '',
//     value: '',
//     icon: 'menu',
//     events: hideMenuHandler
// });

// export const buttonMore = new Button({
//     classAttr: 'btn__more',
//     route: '',
//     value: '',
//     icon: 'more_vert',
//     events: {
//         click: (e) => {
//             const modal = document.querySelector('.more-modal') as HTMLElement;
//             modal.classList.toggle('hidden');
//         }
//     }
// });

// export const buttonFile = new Button({
//     classAttr: 'btn__file',
//     route: '',
//     value: '',
//     icon: 'attach_file'
// });

// export const buttonSend = new Button({
//     classAttr: 'btn__send',
//     route: '',
//     value: '',
//     icon: 'send',
//     events: {
//         click: () => {
//             const input: HTMLInputElement | null = document.querySelector('.input__msg');
//             if (input) {
//                 const message = input?.value;
//                 console.log(message);
//                 input.value = '';
//                 messagesController.sendMessage(store.getState().currentChat.id, message);
//             }
//         }
//     }
// });

// export const inputMenu = new Input({
//     classAttr: 'input__menu',
//     nameAttr: 'search',
//     placeholderAttr: 'Search',
//     typeAttr: 'text',
//     valueAttr: '',
// });

// export const inputMsg = new Input({
//     classAttr: 'input__msg',
//     nameAttr: 'message',
//     placeholderAttr: 'Message',
//     typeAttr: 'text',
//     valueAttr: '',
// });

// const messageBlock = new MessageBlock({
//     classAttr: 'message-block',
//     displayName: 'Michael Scott',
//     lastMessage: 'No! God, please! NOOOO',
//     messageDate: '12:45',
//     newMessages: 3,
//     hiddenClass: '',
//     avatarSource: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABVElEQVR4nO2VvU4CQRSF56GoDBTG1gQTxJ/CgooECxMTirWwpCexorEwYucD4CNACyW4ZBUzZj2PcMnduAkQhQird0ZucZqZ2cn5zp67awCQzzLSBqAAkE8RWiHIJwkdYvgpI20ACgD5FKEVgnyS0CFGtsnE/S7ZTpvs0wPFg54/b+Dj7YUmrSuKgv058RrvOQ8w+cL8LITTAHG/+635VFnXyWR5me3crwTguVAA/FaFBj2/KwTfhxj/4TOKmTrxT8y7Hxn+WCbLy57DMd21H+n84pqK5Srld48SHZSryRrv8RnnAKx9p+bNLRX2jim3U1wqPsNn+Rm4ADAchXRWuVxpfFH8zHAUygJE0SuVTmo/Np/q8LSW3CEGUA8aa5tPVQ8acgCbms99SgGwrW8ADshIG4ACQD5FaIUgnyR0iOGnjLQBKADkU4RWCPJJQocY8mmuoymHavLA3Wry3QAAAABJRU5ErkJggg==',
// });

// const messageBlock2 = new MessageBlock({
//     classAttr: 'message-block',
//     displayName: 'Dwight Schrute',
//     lastMessage: 'I hate Jim',
//     messageDate: '21:04',
//     newMessages: 3,
//     hiddenClass: '',
//     avatarSource: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABVElEQVR4nO2VvU4CQRSF56GoDBTG1gQTxJ/CgooECxMTirWwpCexorEwYucD4CNACyW4ZBUzZj2PcMnduAkQhQird0ZucZqZ2cn5zp67awCQzzLSBqAAkE8RWiHIJwkdYvgpI20ACgD5FKEVgnyS0CFGtsnE/S7ZTpvs0wPFg54/b+Dj7YUmrSuKgv058RrvOQ8w+cL8LITTAHG/+635VFnXyWR5me3crwTguVAA/FaFBj2/KwTfhxj/4TOKmTrxT8y7Hxn+WCbLy57DMd21H+n84pqK5Srld48SHZSryRrv8RnnAKx9p+bNLRX2jim3U1wqPsNn+Rm4ADAchXRWuVxpfFH8zHAUygJE0SuVTmo/Np/q8LSW3CEGUA8aa5tPVQ8acgCbms99SgGwrW8ADshIG4ACQD5FaIUgnyR0iOGnjLQBKADkU4RWCPJJQocY8mmuoymHavLA3Wry3QAAAABJRU5ErkJggg==',
// });

// const messageBlock3 = new MessageBlock({
//     classAttr: 'message-block',
//     displayName: 'Pam Beesly',
//     lastMessage: 'Dunder Mifflin, this is Pam',
//     messageDate: 'Mon',
//     hiddenClass: '-hidden',
//     avatarSource: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABVElEQVR4nO2VvU4CQRSF56GoDBTG1gQTxJ/CgooECxMTirWwpCexorEwYucD4CNACyW4ZBUzZj2PcMnduAkQhQird0ZucZqZ2cn5zp67awCQzzLSBqAAkE8RWiHIJwkdYvgpI20ACgD5FKEVgnyS0CFGtsnE/S7ZTpvs0wPFg54/b+Dj7YUmrSuKgv058RrvOQ8w+cL8LITTAHG/+635VFnXyWR5me3crwTguVAA/FaFBj2/KwTfhxj/4TOKmTrxT8y7Hxn+WCbLy57DMd21H+n84pqK5Srld48SHZSryRrv8RnnAKx9p+bNLRX2jim3U1wqPsNn+Rm4ADAchXRWuVxpfFH8zHAUygJE0SuVTmo/Np/q8LSW3CEGUA8aa5tPVQ8acgCbms99SgGwrW8ADshIG4ACQD5FaIUgnyR0iOGnjLQBKADkU4RWCPJJQocY8mmuoymHavLA3Wry3QAAAABJRU5ErkJggg==',
// });

// const buttonAddUser = new Button({
//     classAttr: 'btn__more-modal',
//     linkColor: 'secondary',
//     value: 'Add user',
//     icon: 'person_add',
//     events: {
//         click: (e: Event) => {
//             const modal = document.querySelector('.more-modal') as HTMLElement;
//             modal.classList.add('hidden');

//             const overlay = document.querySelector('.overlay');
//             overlay?.classList.remove('hidden');

//             renderElement('.main', new ModalForm({
//                 classAttr: 'form__box flex-form modal',
//                 buttonClose: new Button({
//                     classAttr: 'btn__close-modal',
//                     route: '',
//                     value: '',
//                     icon: 'close',
//                     events: closeModalHandler
//                 }),
//                 title: 'Select user',
//                 formName: 'adduser',
//                 errorText: 'User not found',
//                 input: new InputBlock({
//                     input: new Input({
//                         classAttr: 'form__input',
//                         nameAttr: 'login',
//                         placeholderAttr: 'IvanIvanov001',
//                         typeAttr: 'text',
//                         valueAttr: '',
//                         events: inputHandlers
//                     }),
//                     classAttr: 'form__group',
//                     forAttr: 'login',
//                     labelText: 'User login',
//                 }),
//                 buttonMain: new Button({
//                     classAttr: 'btn__main btn__adduser',
//                     value: 'Add',
//                     linkColor: 'main',
//                 }),
//                 events: {
//                     submit: addUser
//                 }
//             }))

//             const focusEl: HTMLButtonElement | null = document.querySelector('.btn__adduser');
//             focusEl?.focus();
//             overlay?.addEventListener('click', () => closeModal());
//         }
//     }
// });

// const buttonDeleteUser = new Button({
//     classAttr: 'btn__more-modal',
//     linkColor: 'secondary',
//     value: 'Delete user',
//     icon: 'person_remove',
//     events: {
//         click: () => console.log('Delete user')
//     }
// });

// const buttonDeleteChat = new Button({
//     classAttr: 'btn__more-modal',
//     linkColor: 'secondary',
//     value: 'Delete chat',
//     icon: 'chat_error',
//     events: {
//         click: () => console.log('Delete chat')
//     }
// });

// const moreModal = new MoreModal({
//     buttonAddUser: buttonAddUser,
//     buttonDeleteUser: buttonDeleteUser,
//     buttonDeleteChat: buttonDeleteChat
// })

// export const sectionSelection = new ChatSelectionWithChat({
//     classAttr: 'section__chat-selection',
//     button: buttonMenu,
//     input: inputMenu,
//     // chat: 'TEST',
//     // messageBlock: messageBlock,
//     // messageBlock2: messageBlock2,
//     // messageBlock3: messageBlock3,
// });

// export const sectionView = new ChatViewWithMessages({
//     classAttr: 'section__chat-view',
//     buttonMore: buttonMore,
//     moreModal: moreModal,
//     buttonFile: buttonFile,
//     buttonSend: buttonSend,
//     input: inputMsg,
//     displayName: 'Michael Scott'
// });

// export const sectionEmpty = new ChatEmpty({
//     classAttr: 'section__chat-empty',
// })

// const buttonClose = new Button({
//     classAttr: 'btn__close',
//     route: '',
//     value: '',
//     icon: 'close',
//     events: hideMenuHandler
// });

// const buttonProfile = new Button({
//     classAttr: 'btn__chatmenu',
//     linkColor: 'secondary',
//     route: 'profile',
//     value: 'Profile',
//     icon: 'person_filled',
//     events: {
//         click: () => router.go('/profile')
//     }
// });

// const buttonNewChat = new Button({
//     classAttr: 'btn__chatmenu',
//     linkColor: 'secondary',
//     route: '',
//     value: 'New chat',
//     icon: 'add',
//     events: createNewChatHandler
// });

// const buttonChangeAvatar = new Button({
//     classAttr: 'btn__chatmenu',
//     linkColor: 'secondary',
//     route: '',
//     value: 'Change avatar',
//     icon: 'account_circle',
//     events: changeAvatarHandler
// });

// const buttonChangePassword = new Button({
//     classAttr: 'btn__chatmenu',
//     linkColor: 'secondary',
//     route: '',
//     value: 'Change password',
//     icon: 'lock',
//     events: changePasswordHandler
// });

// const buttonLogout = new Button({
//     classAttr: 'btn__chatmenu',
//     linkColor: 'secondary',
//     route: '',
//     value: 'Logout',
//     icon: 'logout',
//     events: logoutHandler
// });

// export const chatMenu = new ChatMenu({
//     classAttr: 'menu menu-hide',
//     btnClose: buttonClose,
//     avatar: null,
//     displayName: null,
//     btnProfile: buttonProfile,
//     btnNewChat: buttonNewChat,
//     btnChangeAvatar: buttonChangeAvatar,
//     btnChangePassword: buttonChangePassword,
//     btnLogout: buttonLogout,
// })

// // const chats = new Chats({
// //     sectionSelection: sectionSelection,
// //     sectionView: sectionView,
// //     chatMenu: chatMenu,
// // });

// // const chatsPage = chats;

// // export default chatsPage;

