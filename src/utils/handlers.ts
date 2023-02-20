import { SigninData, SignupData } from "../api/authApi";
import Button from "../components/button/btn";
import ChangePasswordForm from "../components/changePasswordForm/changePasswordForm";
import changePasswordFormProps from "../components/changePasswordForm/changePasswordFormProps";
import Input from "../components/input/input";
import InputBlock from "../components/inputBlock/inputBlock";
import authController from "../controllers/authController";
import userController from "../controllers/userController";
import regExp from "./RegExp";
import renderElement from "./renderElement";


function isValid(key: string, value: string): boolean {
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
	submit: (e: Event) => submitForm(e, 'signup'),
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

const closeModal = function () {
	const root: HTMLElement | null = document.querySelector('.main')
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
				route: 'chats',
				value: 'Change password',
				linkColor: 'main',
			}),
			events: submitPasswordHandler
		}))

		overlay?.addEventListener('click', () => closeModal())
	},
}

const submitPassword = function (e: Event) {
	e.preventDefault;
	const formData: { [key: string]: string } = {};
	const formElement = e.target as HTMLFormElement;
	const inputs = formElement?.querySelectorAll('input');

	inputs?.forEach((input: HTMLInputElement) => {
		formData[input.name] = input.value;
	})

	const formIsValid = Object.entries(formData).every(([key, value]) => isValid(key, value))

	if (formIsValid) {
		console.log(formData);
		delete formData[2];
		console.log(formData);
	}

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
