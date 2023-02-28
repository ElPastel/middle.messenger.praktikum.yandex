import Button from "../components/button/btn";
import ChangePasswordForm from "../components/changePasswordForm/changePasswordForm";
import Input from "../components/input/input";
import InputBlock from "../components/inputBlock/inputBlock";
import MessageBlock from "../components/messageBlock/messageBlock";
import ModalForm from "../components/modalForm/modalForm";
import authController from "../controllers/authController";
import chatsController from "../controllers/chatsController";
import userController from "../controllers/userController";
import store from "../modules/store";
import { Indexed } from "./helpers";
import regExp from "./RegExp";
import renderElement from "./renderElement";

function isValid(key: string, value: string): boolean {
	console.log(key, value);

	if (key === 'oldPassword' || key === 'newPassword') key = 'password';
	const pattern = regExp[key];
	return pattern.test(value);
}

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

export function submitForm(e: Event, form: string) {
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
		if (form === 'signin') authController.signin(formData);
		if (form === 'signup') authController.signup(formData);

		// if (form === 'signup') {
		// 	formData['display_name'] = formData['first_name'];
		// 	console.log(formData);			
		// 	authController.signup(formData);
		// } 
	}
}

export function updateUserData(e: Event) {
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

export const inputHandlers = {
	focus: (e: Event) => focusHandler(e),
	blur: (e: Event) => blurHandler(e),
};

export const submitHandlerLog = {
	submit: (e: Event) => submitForm(e, 'signin'),
}

export const submitHandlerReg = {
	submit: (e: Event) => submitForm(e, 'signup'),
}

export const editHandler = {
	submit: (e: Event) => updateUserData(e),
}

export const hideMenuHandler = {
	click: (e: Event) => {
		e.preventDefault;
		const menu = document.querySelector('.menu');
		menu?.classList.toggle('menu-hide');
	},
}

export const logoutHandler = {
	click: () => {
		authController.logout();
	},
}

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
				forAttr: 'email',
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
				forAttr: 'email',
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
				forAttr: 'email',
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

const submitPassword = function (e: Event) {
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

const submitPasswordHandler = {
	submit: (e: Event) => submitPassword(e)
}

const submitAvatar = function (e: Event) {
	e.preventDefault();
	// @ts-ignore
	const formData = new FormData(document.forms.avatarchange);

	if (formData) {
		userController.changeAvatar(formData);
	}
}

const submitAvatarHandler = {
	submit: (e: Event) => submitAvatar(e)
}

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
			// errorText: '',
			input: new InputBlock({
				input: new Input({
					classAttr: 'form__input',
					nameAttr: 'title',
					idAttr: 'chat-title',
					typeAttr: 'text',
					valueAttr: '',
					// events: inputHandlers
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

		console.log(formData);
		// chatsController.createChat(formData);
		console.log(store.getState());

		// renderElement('container__messages', new MessageBlock({
		// 	classAttr: 'message-block',
		// 	displayName: '',
		// 	lastMessage: '',
		// 	messageDate: '',
		// 	// hiddenClass: '-hidden',
		// 	avatarSource: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABVElEQVR4nO2VvU4CQRSF56GoDBTG1gQTxJ/CgooECxMTirWwpCexorEwYucD4CNACyW4ZBUzZj2PcMnduAkQhQird0ZucZqZ2cn5zp67awCQzzLSBqAAkE8RWiHIJwkdYvgpI20ACgD5FKEVgnyS0CFGtsnE/S7ZTpvs0wPFg54/b+Dj7YUmrSuKgv058RrvOQ8w+cL8LITTAHG/+635VFnXyWR5me3crwTguVAA/FaFBj2/KwTfhxj/4TOKmTrxT8y7Hxn+WCbLy57DMd21H+n84pqK5Srld48SHZSryRrv8RnnAKx9p+bNLRX2jim3U1wqPsNn+Rm4ADAchXRWuVxpfFH8zHAUygJE0SuVTmo/Np/q8LSW3CEGUA8aa5tPVQ8acgCbms99SgGwrW8ADshIG4ACQD5FaIUgnyR0iOGnjLQBKADkU4RWCPJJQocY8mmuoymHavLA3Wry3QAAAABJRU5ErkJggg==',
		// }))


	}
}

export const addUser = function (e: Event) {
	e.preventDefault();
	const formData: { [key: string]: string } = {};
	const formElement = e.target as HTMLFormElement;
	const input = formElement?.querySelector('input');

	if (input) formData[input.name] = input.value;

	if (formData) {
		console.log(formData);
		let userId: Indexed;
		userController.getUserByLogin(formData).then(res => {
			userId = res
			console.log(store.getState());
			console.log(`USER ID: ${userId}`);
			console.log(`CHAT ID: ${store.getState().currentChat}`);

			chatsController.addUserToChat(userId);
		});
	}
}

export const deleteUser = function (e: Event) {
	e.preventDefault();
	const formData: { [key: string]: string } = {};
	const formElement = e.target as HTMLFormElement;
	const input = formElement?.querySelector('select');

	if (input) formData[input.name] = input.value;

	if (formData) {
		console.log(formData);
		let userId: Indexed;
		userController.getUserByLogin(formData).then(res => {
			userId = res
			console.log(store.getState());
			console.log(`USER ID: ${userId}`);
			console.log(`CHAT ID: ${store.getState().currentChat}`);

			chatsController.deleteUserFromChat(userId);
		});
	}
}
