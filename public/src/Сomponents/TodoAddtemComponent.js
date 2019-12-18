import Store from '../Store/Store.js';

const template = document.createElement('template');

template.innerHTML = `
	<style>
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

		input[type="text"] {			
			width: 100%;
			height: 100%;
			outline: none;
			border: none;
			border-bottom: 2px solid #af7eeb;
			font-size: 1em;
			color: #999fc0;
		}

		.add-item-btn {
			display: flex;
			justify-content: flex-end;
			width: 25%;
			padding-left: 20px;
		}

		button {
			outline: none;
			border: 2px solid #af7eeb;
			border-radius: 8px;
			background: #af7eeb;
			color: white;
			font-size: 1em;
			cursor: pointer;
			transition: 0.1s;
		}

		button:active {
			background: #af7eeb;
			color: white;
			transform: scale(0.95);
		}
	</style>
	
	<div class="description">Добавить новую задачу:</div>
	<div class="item-text">
		<input type="text" >
	</div>
	<div class="add-item-btn"><button>Добавить</button></div>
`

export default class TodoAddtemComponent extends HTMLElement {

	_template;
	_newItemText = '';
	_addItemBtn;

	constructor() {
		super();
		this.attachShadow({mode: "open"});
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
	 * @param {Event} event 
	 */
	onSubmit(event) {
		if ((event.key === 'Enter' || event.target.tagName === "BUTTON") && this.newItemText.value) {
			this.sendNewTodo();
			this.clearInput();
		}
	}

	sendNewTodo() {
		Api.createTodo(this.getNewTodoData())
			.then(newTodo => this.dispatchCreateTodo(newTodo))
			.catch(error => console.error(error));
	}

	/**
	 * Сохраняет занчение при его изменении
	 * @param {Event} event 
	 */
	onChange(event) {
		this.newItemText.value = event.target.value;
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
	 * Вызывает событие создания задачи списка дел
	 */
	dispatchCreateTodo(data) {
		Store.dispatch('addTodo', data);
	}

	/**
	 * Возвращает объект с данными для нового todo
	 * @returns {Object}
	 */
	getNewTodoData() {
		return {
			text: this.newItemText.value,
			createDate: new Date(),
			completed: false,
		}
	}

	/**
	 * Очищает поле
	 */
	clearInput() {
		this.newItemText.value = '';
	}

	/**
	 * Отрисовка элемента
	 */
	render() {
		this._template = template.content.cloneNode(true);
		
		this._newItemText = this.template.querySelector(".item-text input[type=text]");
		this._addItemBtn = this.template.querySelector('.add-item-btn button');
		
		this.shadowRoot.innerHTML = '';

		this.shadowRoot.appendChild(this.template);
	}
}