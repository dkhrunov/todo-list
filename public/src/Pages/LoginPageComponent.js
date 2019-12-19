export default class LoginPageComponent {

	_inputEmail;
	_inputPassword;
	_submitBtn;
	_api;

	constructor() {
		this.fragment = document.createDocumentFragment();
		this._inputEmail = document.createElement('input');
		this._inputPassword = document.createElement('input');
		this._submitBtn = document.createElement('button');
		this._api = window.Api;
	}

	/**
	 * @returns {HTMLTemplateElement}
	 */
	get inputEmail() { return this._inputEmail; }

	/**
	 * @returns {HTMLTemplateElement}
	 */
	get inputPassword() { return this._inputPassword; }

	/**
	 * @returns {HTMLTemplateElement}
	 */
	get submitBtn() { return this._submitBtn; }

	/**
	 * @returns {TodoApi}
	 */
	get api() { return this._api; }

	onDestroy() {
		this.unSubscribeEvents();
	}

	/**
	 * Авторизация и перенаправление после успешной авторизации
	 * @param {Event} event 
	 */
	onSubmit(event) {
		this.api.login({ email: this.inputEmail.value, password: this.inputPassword.value })
			.then(res => {
				window.localStorage.setItem('auth_token', res.token);
				window.localStorage.setItem('userId', res.id);
				toastr.success('Welcome back!');
				window.dispatchEvent(new CustomEvent('changeRoute', { detail: { route: 'todolist' } }));
			})
			.catch(error => toastr.error(error))

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

		this.inputEmail.classList.add('input');
		this.inputEmail.setAttribute('type', 'email');
		this.inputEmail.setAttribute('placeholder', 'Email address');
		loginBoxElement.appendChild(this.inputEmail);
		
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