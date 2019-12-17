import Store from '../Store/Store.js';

export default class LoginPageComponent {

	_inputLogin;
	_inputPassword;
	_submitBtn;

	constructor() {
		this.fragment = document.createDocumentFragment();
		this._inputLogin = document.createElement('input');
		this._inputPassword = document.createElement('input');
		this._submitBtn = document.createElement('button');
	}

	/**
	 * @returns {HTMLTemplateElement}
	 */
	get inputLogin() { return this._inputLogin; }

	/**
	 * @returns {HTMLTemplateElement}
	 */
	get inputPassword() { return this._inputPassword; }

	/**
	 * @returns {HTMLTemplateElement}
	 */
	get submitBtn() { return this._submitBtn; }

	onDestroy() {
		this.unSubscribeEvents();
	}

	/**
	 * Авторизация и перенаправление после успешной авторизации
	 * @param {Event} event 
	 */
	onSubmit(event) {
		// TODO добавить авторизацию
		//if (this.inputLogin.value == 'admin' && this.inputPassword.value == 'admin') {
			window.localStorage.setItem('auth_token', 'ea135929105c4f29a0f5117d2960926f');
			window.dispatchEvent(new CustomEvent('changeRoute', { detail: { route: 'todolist' } }));
		//}
		event.preventDefault();
	}

	/**
	 * Оформление подписок событий элемента
	 */
	subscribeEvents() {
		this.submitBtn.addEventListener('click', (event) => this.onSubmit(event));
	}

	/**
	 * Отписка от всех событий
	 */
	//TODO отписываться
	unSubscribeEvents() {
		this.submitBtn.removeEventListener('click', aaaaaa => this.render(aaa));
	}

	/**
	 * Отрисовка элемента
	 */
	render() {
		const divWrapper = document.createElement('div');
		divWrapper.classList.add('wrapper');
		this.fragment.appendChild(divWrapper);

		const heading = document.createElement('h1');
		heading.innerText = 'Todo List'
		divWrapper.appendChild(heading);

		const formElement = document.createElement('form');
		formElement.classList.add('login-form');
		divWrapper.appendChild(formElement);

		const loginBoxElement = document.createElement('div');
		loginBoxElement.classList.add('inputBox');
		formElement.appendChild(loginBoxElement);

		this.inputLogin.classList.add('input');
		this.inputLogin.setAttribute('type', 'text');
		this.inputLogin.setAttribute('placeholder', 'Login');
		loginBoxElement.appendChild(this.inputLogin);
		
		const passwordBoxElement = document.createElement('div');
		passwordBoxElement.classList.add('inputBox');
		formElement.appendChild(passwordBoxElement);

		this.inputPassword.classList.add('input');
		this.inputPassword.setAttribute('type', 'password');
		this.inputPassword.setAttribute('placeholder', 'Password');
		passwordBoxElement.appendChild(this.inputPassword);

		this.submitBtn.innerText = 'Sign in';
		this.submitBtn.setAttribute('type', 'submit');
		formElement.appendChild(this.submitBtn);
		
		this.subscribeEvents();

		return this.fragment;
	}
}