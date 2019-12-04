const template = document.createElement('template');

template.innerHTML = `
	<style>
		input[type="text"] {			
			width: 100%;
			height: 100%;
			outline: none;
			border: none;
			border-bottom: 2px solid #af7eeb;
			font-size: 1em;
			color: #999fc0;
		}

		.description {
			font-size: 0.8em;
			font-weight: bold;
			color: #af7eeb;
			text-transform: uppercase;
			width: 25%;
			padding-right: 20px;
		}

		.item-text {
			display: flex;
			justify-content: flex-end;
			width: 50%;
		}

		.add-item-btn {
			display: flex;
			justify-content: flex-end;
			width: 25%;
			padding-left: 20px;
		}

		button {
			padding: 0;
			outline: none;
			border: 2px solid #af7eeb;
			border-radius: 50%;
			background: white;
			color: #af7eeb;
			width: 1.3em;
			height: 1.3em;
			font-size: 1.3em;
			cursor: pointer;
			transition: 0.1s;
		}

		button:active {
			background: #af7eeb;
			color: white;
			transform: scale(0.8);
		}
	</style>
	
	<div class="description">Добавить новое событие:</div>
	<div class="item-text">
		<input type="text" >
	</div>
	<div class="add-item-btn"><button>+</button></div>
`

export default class CreateItemComponent extends HTMLElement {

	_template;
	_newItemText = '';
	_addItemBtn;

	constructor() {
		super();
		this.attachShadow({mode: "open"});
		this._template = template.content.cloneNode(true);
		this._newItemText = this.template.querySelector(".item-text input[type=text]");
		this._addItemBtn = this.template.querySelector('.add-item-btn button');
	}

	/**
	 * @returns {HTMLTemplateElement}
	 */
	get template() { return this._template }

	/**
	 * @returns {HTMLElement}
	 */
	get newItemText() { return this._newItemText; }

	/**
	 * @returns {HTMLElement}
	 */
	get addItemBtn() { return this._addItemBtn; }

	connectedCallback(){
		this.render();
		this.subscribeEvents();
	}

	disconnectedCallback() {
		this.unSubscribeEvents();
	}

	/**
	 * Сохранение нового елемента в списке
	 * @param {HTMLEventElement} event 
	 */
	onSubmit(event) {
		// Press Enter key!
		if (event.key === 'Enter') {
			console.log('handlerSubmit PRESS ENTER: ', this.newItemText.value);
		}
		// Press plus button
		if (event.target.tagName === "BUTTON") {
			console.log('handlerSubmit PRESS BUTTON: ' + this.newItemText.value);
		}
	}

	/**
	 * Сохраняет занчение при его изменении
	 * @param {HTMLEventElement} event 
	 */
	onChange(event) {
		this.newItemText.value = event.target.value;
		console.log('onChange: ', this.newItemText.value);
	}

	/**
	 * Оформление подписок событий элемента
	 */
	subscribeEvents() {
		this.newItemText.addEventListener('change', (event) => this.onChange(event));
		this.addItemBtn.addEventListener('click', (event) => this.onSubmit(event));
		this.newItemText.addEventListener('keydown', (event) => this.onSubmit(event));
	}

	/**
	 * Отписка от всех событий
	 */
	unSubscribeEvents() {
		this.newItemText.removeEventListener('change', (event) => this.onChange(event));
		this.addItemBtn.removeEventListener('click', (event) => this.onSubmit(event));
		this.newItemText.removeEventListener('keydown', (event) => this.onSubmit(event));
	}

	/**
	 * Отрисовка элемента
	 */
	render() {
		this.shadowRoot.innerHTML = '';

		this.shadowRoot.appendChild(this.template);
	}
}