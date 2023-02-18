import authController from "../controllers/authController";
import regExp from "./RegExp";

function isValid(key: string, value: string): boolean {
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
	const inputs = document.querySelectorAll('input');

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
	blur: (e: Event) => blurHandler(e)
};

export const submitHandlerLog = {
	submit: (e: Event) => submitForm(e, 'signin'),
}

export const submitHandlerReg = {
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
