import Store from '../Store/Store.js';
import { formatDate } from '../Utilities/utilities.js';

const template = document.createElement('template');

template.innerHTML = `
	<style>
		li {
			display: flex;
			align-items: center;
			min-height: 50px;
			font-size: 1em;
			color: #999fc0;
			border-bottom: 2px solid #e3e9ff;
		}

		li:hover, li:hover input[type=text] {
			background: #f7f9ff;
		}

		label {
			width: 90%;
			margin-left: 10px;
			cursor: pointer;
		}

		input[type=text] {
			width: 100%;
			font-size: 1em;
			color: #999fc0;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			border: none;
			outline: none;
		}

		.date {
			margin: 0 15px;
		}

		.remove-item {
			font-size: 1.3em;
			cursor: pointer;
			color: red;
		}

	</style>
	
	<li>
		<input type="checkbox" >
		<label><input type="text" ></label>
		<div class="date"></div>
		<div class="remove-item">
			<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" style="fill: #bb0000">
				<path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2zm-7-10.414l3.293-3.293 1.414 1.414-3.293 3.293 3.293 3.293-1.414 1.414-3.293-3.293-3.293 3.293-1.414-1.414 3.293-3.293-3.293-3.293 1.414-1.414 3.293 3.293zm10-8.586h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-8-3h-4v1h4v-1z"/>
			</svg>
		</div>
	</li>
`;

export default class TodoItemComponent extends HTMLElement {

	_template;
	_checkbox;
	_textInput;
	_removeBtn;

	constructor() {
		super();
		this.attachShadow({mode: "open"});
	}

	/**
	 * @returns {HTMLTemplateElement}
	 */
	get template() { return this._template; }

	/**
	 * @returns {HTMLTemplateElement}
	 */
	get checkbox() { return this._checkbox; }

	/**
	 * @returns {HTMLTemplateElement}
	 */
	get textInput() { return this._textInput; }

	/**
	 * @returns {HTMLTemplateElement}
	 */
	get removeBtn() { return this._removeBtn; }

	connectedCallback(){
		this.render();
		this.subscribeEvents();
	}

	disconnectedCallback() {
		this.unSubscribeEvents();
	}

	/**
	 * Изменяет атрибут статуса задания и меняет его UI
	 */
	toggleStatus() {
		if (this.getAttribute('status') === 'waiting') {
			this.setAttribute('status', 'done');
		}
		else if (this.getAttribute('status') === 'done') {
			this.setAttribute('status', 'waiting');
		}
	}

	/**
	 * Изменяет статус задания
	 */
	onChangeStatus() {
		this.toggleStatus();
		this.dispatchEditTodo();
	}

	/**
	 * Удаляет задание из общего списка
	 */
	onRemoveItem() {
		this.dispatchDeleteTodo();
	}

	/**
	 * Изменяет текст задания
	 */
	onChangeText() {
		if (this.textInput.value == '') {
			this.textInput.value = this.getAttribute('text');
		} else {
			this.setAttribute('text', this.textInput.value);
			this.dispatchEditTodo();
		}
	}

	/**
	 * Оформление подписок событий элемента
	 */
	subscribeEvents() {
		this.checkbox.addEventListener('click', () => this.onChangeStatus());
		this.removeBtn.addEventListener('click', () => this.onRemoveItem());
		this.textInput.addEventListener('change', () => this.onChangeText());
	}

	/**
	 * Отписка от всех событий
	 */
	unSubscribeEvents() {
		this.checkbox.removeEventListener('click', () => this.onChangeStatus());
		this.removeBtn.removeEventListener('click', () => this.onRemoveItem());
		this.textInput.removeEventListener('change', () => this.onChangeText());
	}

	/**
	 * Вызывает событие изменения задачи из списка дел
	 */
	dispatchEditTodo() {
		Store.dispatch('editTodo', this.getTodoData());
	}

	/**
	 * Вызывает событие удаления задачи из списка дел
	 */
	dispatchDeleteTodo() {
		Store.dispatch('removeTodo', this.getTodoData());
	}

	/**
	 * Собирает все пропсы в объект
	 * @returns {Object}
	 */
	getTodoData() {
		return {
			id: this.getAttribute('task-id'),
			text: this.getAttribute('text'),
			date: new Date(this.getAttribute('date')),
			status: this.getAttribute('status'),
		}
	}

	/**
	 * Отрисовка элемента
	 */
	render() {		
		this._template = template.content.cloneNode(true);

		this._checkbox = this.template.querySelector('input[type=checkbox]');
		this._removeBtn = this.template.querySelector('.remove-item');
		this._textInput = this.template.querySelector('label input[type=text]');

		this.shadowRoot.innerHTML = '';

		this.template.querySelector('li').setAttribute('task-id', this.getAttribute('task-id'));
		this.template.querySelector('label').setAttribute('for', this.getAttribute('task-id'));
		this.template.querySelector('label input[type=text]').value = this.getAttribute('text');
		this.template.querySelector('.date').innerText = formatDate(new Date(this.getAttribute('date')));

		if (this.getAttribute('status') === 'done') { 
			this.checkbox.checked = true;
			this.textInput.style.textDecoration = 'line-through';
		}

		this.shadowRoot.appendChild(this.template);
	}
}