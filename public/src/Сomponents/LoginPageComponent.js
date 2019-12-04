// const template = document.createElement('template');
// template.innerHTML = `
// 	<style>
// 	</style>

// 	<form>
// 		<div class="inputBox">
// 			<label class="labelText">Login:</label>
// 			<input class="input" type="email">
// 		</div>
// 		<div class="inputBox">
// 			<label class="labelText">Password:</label>
// 			<input class="input" type="password">
// 		</div>
// 		<button type="submit">Login</button>
// 	</form>
// `;

// export default class LoginPageComponent extends HTMLElement {

// 	_template;
// 	_submitBtn;

// 	constructor() {
// 		super();
// 		this.attachShadow({mode: "open"});
// 		this._template = template.content.cloneNode(true);
// 		this._submitBtn = this.template.querySelector('button[type=submit]');
// 	}

// 	/**
// 	 * @returns {HTMLTemplateElement}
// 	 */
// 	get template() { return this._template; }

// 	/**
// 	 * @returns {HTMLElement}
// 	 */
// 	get submitBtn() { return this._submitBtn; }

// 	connectedCallback(){
// 		this.render();
// 		this.subscribeEvents();
// 	}

// 	disconnectedCallback() {
// 		this.unSubscribeEvents();
// 	}

// 	/**
// 	 * Удаляет задание из общего списка
// 	 */
// 	onRemoveItem() {
// 		this.remove();
// 	}

// 	/**
// 	 * Оформление подписок событий элемента
// 	 */
// 	subscribeEvents() {
// 		this.submitBtn.addEventListener('click', (event) => this.onSubmitForm(event));
// 	}

// 	/**
// 	 * Отписка от всех событий
// 	 */
// 	unSubscribeEvents() {
// 		this.submitBtn.addEventListener('click', (event) => this.onSubmitForm(event));
// 	}

// 	/**
// 	 * Подтверждение ввода данных для входа
// 	 * @param {HTMLEventElement} event 
// 	 */
// 	onSubmitForm(event) {
// 		// Если успешно залогинился то перенаправляем
// 		window.dispatchEvent(new CustomEvent('changeRoute', { detail: { route: 'todolist' } }));
// 		event.preventDefault();
// 	}

// 	/**
// 	 * Отрисовка элемента
// 	 */
// 	render() {
// 		this.shadowRoot.appendChild(this.template);
// 	}
// }

// TODO разбить логику render
export default class LoginPageComponent {
	constructor() {
		this.fragment = document.createDocumentFragment();
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

		const inputLoginElement = document.createElement('input');
		inputLoginElement.classList.add('input');
		inputLoginElement.setAttribute('type', 'text');
		inputLoginElement.setAttribute('placeholder', 'Login');
		loginBoxElement.appendChild(inputLoginElement);
		
		const passwordBoxElement = document.createElement('div');
		passwordBoxElement.classList.add('inputBox');
		formElement.appendChild(passwordBoxElement);

		const inputPasswordElement = document.createElement('input');
		inputPasswordElement.classList.add('input');
		inputPasswordElement.setAttribute('type', 'password');
		inputPasswordElement.setAttribute('placeholder', 'Password');
		passwordBoxElement.appendChild(inputPasswordElement);

		const submitBtn = document.createElement('button');
		submitBtn.innerText = 'Sign in';
		submitBtn.setAttribute('type', 'submit');
		formElement.appendChild(submitBtn);
		submitBtn.addEventListener('click', (event) => {
			window.dispatchEvent(new CustomEvent('changeRoute', { detail: { route: 'todolist' } }));
	 		event.preventDefault();
		});

		return this.fragment;
	}
}