import Button from "../components/button/btn";
import ChangePasswordForm from "../components/changePasswordForm/changePasswordForm";
import Input from "../components/input/input";
import InputBlock from "../components/inputBlock/inputBlock";
import ModalForm from "../components/modalForm/modalForm";
import authController from "../controllers/authController";
import chatsController from "../controllers/chatsController";
import userController from "../controllers/userController";
import { Indexed } from "./helpers";
import regExp from "./RegExp";
import renderElement from "./renderElement";

function isValid(key: string, value: string): boolean {
	console.log(key, value);

	if (key === 'oldPassword' || key === 'newPassword') key = 'password';
	const pattern = regExp[key];
	return pattern.test(value);
}

// INPUT VALIDATION
function focusHandler(e: Event) {
	const input = e.target as HTMLInputElement;
	const errorMsg = document.querySelector(`.error-${input.name}`);
	if (errorMsg) errorMsg.classList.add('nonvisible');
	input.classList.remove('unvalid-input');
}

function blurHandler(e: Event) {
	const input = e.target as HTMLInputElement;
	const errorMsg = document.querySelector(`.error-${input.name}`);

	if (!isValid(input.name, input.value)) {
		errorMsg?.classList.remove('nonvisible');
		input.classList.add('unvalid-input');
	} else {
		errorMsg?.classList.add('nonvisible');
		input.classList.remove('unvalid-input');
	}
}

export const inputHandlers = {
	focus: (e: Event) => focusHandler(e),
	blur: (e: Event) => blurHandler(e),
};

//SUBMIT FORMS
export function submitForm(e: Event, form: string) {
	e.preventDefault();
	const formData: { [key: string]: string } = {};
	const formElement = e.target as HTMLFormElement;
	const inputs = formElement?.querySelectorAll('input');

	inputs?.forEach((input: HTMLInputElement) => {
		formData[input.name] = input.value;
	})

	const formIsValid = Object.entries(formData).every(([key, value]) => isValid(key, value));

	if (formIsValid) {
		console.log(formData);

		if (form === 'signin') authController.signin(formData as Indexed);
		if (form === 'signup') authController.signup(formData as Indexed);
	}
}

export const submitHandlerLog = {
	submit: (e: Event) => submitForm(e, 'signin'),
}

export const submitHandlerReg = {
	submit: (e: Event) => submitForm(e, 'signup'),
}

// EDIT FORM UPDATE
function updateUserData(e: Event) {
	e.preventDefault();
	const formData: { [key: string]: string } = {};
	const formElement = e.target as HTMLFormElement;
	const inputs = formElement?.querySelectorAll('input');

	inputs?.forEach((input: HTMLInputElement) => {
		formData[input.name] = input.value;
	})

	const formIsValid = Object.entries(formData).every(([key, value]) => isValid(key, value))

	if (formIsValid) {
		console.log(formData);
		userController.changeProfile(formData);
	}
}

export const editHandler = {
	submit: (e: Event) => updateUserData(e),
}

// CHAT MENU
export const hideMenuHandler = {
	click: (e: Event) => {
		e.preventDefault;
		const menu = document.querySelector('.menu');
		menu?.classList.toggle('menu-hide');
	},
}

// LOGOUT BUTTON
export const logoutHandler = {
	click: () => {
		authController.logout();
	},
}

// MORE BUTTON
export const moreModalHandler = {
	click: () => {
		const modal = document.querySelector('.more-modal') as HTMLElement;
		modal.classList.toggle('hidden');
	}
}

// ADD USER BUTTON
export const addUserHandler = {
	click: () => {
		const modal = document.querySelector('.more-modal') as HTMLElement;
		modal?.classList.add('hidden');

		const overlay = document.querySelector('.overlay') as HTMLElement;
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
				error: 'login',
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

const addUser = function (e: Event) {
	e.preventDefault();
	const formData: { [key: string]: string } = {};
	const formElement = e.target as HTMLFormElement;
	const input = formElement?.querySelector('input');

	if (input) formData[input.name] = input.value;

	if (formData) {
		let userId: Indexed;
		userController.getUserByLogin(formData).then(res => {
			userId = res
			chatsController.addUserToChat(userId);
		});
	}
}

// CLOSE MODAL FORM HELPERS
export const closeModal = function () {
	const root: HTMLElement | null = document.querySelector('.main');
	const modal: HTMLElement | null = document.querySelector('.modal');
	const menu: HTMLElement | null = document.querySelector('.menu');
	const overlay: HTMLElement | null = document.querySelector('.overlay');
	if (modal) root?.removeChild(modal);
	overlay?.classList.add('hidden');
	menu?.classList.add('menu-hide');
}

export const closeModalHandler = {
	click: () => closeModal()
}

// CHANGE PASSWORD BUTTON
export const changePasswordHandler = {
	click: () => {
		const overlay = document.querySelector('.overlay');
		overlay?.classList.remove('hidden');

		renderElement('.main', new ChangePasswordForm({
			classAttr: 'form__box flex-form modal',
			buttonClose: new Button({
				classAttr: 'btn__close-modal',
				route: '',
				value: '',
				icon: 'close',
				events: closeModalHandler
			}),
			title: 'Update password',
			inputOldPassword: new InputBlock({
				input: new Input({
					classAttr: 'form__input',
					nameAttr: 'oldPassword',
					placeholderAttr: '••••••••',
					typeAttr: 'password',
					valueAttr: '',
					events: inputHandlers
				}),
				classAttr: 'form__group',
				forAttr: 'password',
				error: 'oldPassword',
				labelText: 'Old password',
			}),
			inputNewPassword1: new InputBlock({
				input: new Input({
					classAttr: 'form__input',
					nameAttr: 'newPassword',
					placeholderAttr: '••••••••',
					typeAttr: 'password',
					valueAttr: '',
					events: inputHandlers
				}),
				classAttr: 'form__group',
				forAttr: 'password',
				error: 'newPassword',
				labelText: 'New password',
			}),
			inputNewPassword2: new InputBlock({
				input: new Input({
					classAttr: 'form__input',
					nameAttr: 'password',
					placeholderAttr: '••••••••',
					typeAttr: 'password',
					valueAttr: '',
					events: inputHandlers
				}),
				classAttr: 'form__group',
				forAttr: 'password',
				error: 'password',
				labelText: 'Repeat new password',
			}),
			buttonMain: new Button({
				classAttr: 'btn__main',
				value: 'Change password',
				linkColor: 'main',
			}),
			events: submitPasswordHandler
		}))

		overlay?.addEventListener('click', () => closeModal());
	},
}


const submitPasswordHandler = {
	submit: (e: Event) => {
		e.preventDefault();
		const formData: { [key: string]: string } = {};
		const formElement = e.target as HTMLFormElement;
		const inputs = formElement?.querySelectorAll('input');

		inputs?.forEach((input: HTMLInputElement) => {
			formData[input.name] = input.value;
		})

		const formIsValid = Object.entries(formData).every(([key, value]) => isValid(key, value))

		if (formIsValid && formData.newPassword === formData.password) {
			delete formData.password;
			console.log(formData);
			userController.changePassword(formData);
		}
	}
}

// CHANGE AVATAR BUTTON
export const changeAvatarHandler = {
	click: (e: Event) => {
		const buttonTarget = e.target as HTMLButtonElement;
		buttonTarget?.blur();

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
			title: 'Upload avatar',
			formName: 'avatarchange',
			errorText: 'File not selected',
			input: new Input({
				nameAttr: 'avatar',
				typeAttr: 'file',
				idAttr: 'file',
				acceptAttr: 'image/*'
			}),
			buttonMain: new Button({
				classAttr: 'btn__main',
				value: 'Change avatar',
				linkColor: 'main',
			}),
			events: submitAvatarHandler
		}))

		const focusEl: HTMLButtonElement | null = document.querySelector('.btn__main');
		focusEl?.focus();
		overlay?.addEventListener('click', () => closeModal());
	}
}

const submitAvatarHandler = {
	submit: (e: Event) => {
		e.preventDefault();
		const formData = new FormData((document.forms as HTMLCollectionOf<HTMLFormElement>).namedItem('avatarchange')!);

		if (formData) {
			userController.changeAvatar(formData);
		}
	}
}

//CREATE NEW CHAT BUTTON
export const createNewChatHandler = {
	click: () => {
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
			title: 'Create chat',
			input: new InputBlock({
				input: new Input({
					classAttr: 'form__input',
					nameAttr: 'title',
					idAttr: 'chat-title',
					typeAttr: 'text',
					valueAttr: '',
					events: inputHandlers
				}),
				classAttr: 'form__group',
				labelText: 'Chat title',
				forAttr: 'chat-title',
			}),
			buttonMain: new Button({
				classAttr: 'btn__main',
				value: 'Create chat',
				linkColor: 'main',
			}),
			events: submitCreateChatHandler
		}))

		overlay?.addEventListener('click', () => closeModal());
	},
}

const submitCreateChatHandler = {
	submit: (e: Event) => {
		e.preventDefault();
		const formData: { [key: string]: string } = {};
		const formElement = e.target as HTMLFormElement;
		const input = formElement?.querySelector('input');
		if (input) formData[input.name] = input.value;
		chatsController.createChat(formData);
	}
}

// DELETE USER BUTTON
export const deleteUser = function (e: Event) {
	e.preventDefault();
	const formData: { [key: string]: string } = {};
	const formElement = e.target as HTMLFormElement;
	const input = formElement?.querySelector('select');

	if (input) formData[input.name] = input.value;
	if (formData) {
		let userId: Indexed;
		userController.getUserByLogin(formData).then(res => {
			userId = res;
			chatsController.deleteUserFromChat(userId);
		});
	}
}

// DELETE CHAT BUTTON
export const deleteChatHandler = {
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
			title: 'Are you sure you want to delete a chat?',
			formName: 'deletechat',
			buttonMain: new Button({
				classAttr: 'btn__main btn__deletechat',
				value: 'Yes',
				typeAttr: 'submit',
				linkColor: 'main',
			}),
			events: {
				submit: deleteChat
			}
		}))

		const focusEl: HTMLButtonElement | null = document.querySelector('.btn__deletechat');
		focusEl?.focus();
		overlay?.addEventListener('click', () => closeModal());
	}
}

const deleteChat = function (e: Event) {
	e.preventDefault();
	console.log('deletechat');

	chatsController.deleteChat();

	(document.querySelector('.section__chat-empty') as HTMLElement).style.display = 'flex';
	(document.querySelector('.section__chat-view') as HTMLElement).style.display = 'none';

	closeModal();
}
