const template = document.createElement('template');
const statusWaiting = '<i class="fa fa-circle-o status-waiting" aria-hidden="true"></i>';
const statusDone = '<i class="fa fa-circle status-done" aria-hidden="true"></i>';

template.innerHTML = `
	<style>
		li {
			display: flex;
			align-items: center;
			min-height: 50px;
			font-size: 1em;
			margin: 10px;
			color: #999fc0;
			transition: 0.3s;
			border-bottom: 1px solid transparent;
			cursor: pointer;
		}

		li:hover {
			border-color: #3b064d;
		}

		input[type=checkbox] {
			width: 5%;
			cursor: pointer;
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

		.icon-status {
			font-size: 1.3em;
			cursor: pointer;
		}

		.status-done {
			color: #af7eeb;
		}

		.status-waiting {
			color: #999fc0;
		}

		.remove-item {
			font-size: 1.3em;
			cursor: pointer;
			/*color: red;*/
		}

	</style>

	<link rel="stylesheet" href="../style/font-awesome/css/font-awesome.min.css">
	
	<li>
		<input type="checkbox" hidden >
		<div class="icon-status"></div>
		<label><input type="text" ></label>
		<div class="date"></div>
		<div class="remove-item"><i class="fa fa-trash-o" aria-hidden="true"></i></div>
	</li>
`;

export default class TodoItemComponent extends HTMLElement {

	_template;
	_iconStatus;
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
	get iconStatus() { return this._iconStatus; }

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
			
			this.textInput.style.textDecoration = 'line-through';
			this.iconStatus.innerHTML = statusDone;
		}
		else if (this.getAttribute('status') === 'done') {
			this.setAttribute('status', 'waiting');

			this.textInput.style.textDecoration = '';
			this.iconStatus.innerHTML = statusWaiting;
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
		this.remove();
	}

	/**
	 * Изменяет текст задания
	 */
	onChangeText() {
		this.setAttribute('text', this.textInput.value);
		this.dispatchEditTodo();
	}

	/**
	 * Оформление подписок событий элемента
	 */
	subscribeEvents() {
		this.iconStatus.addEventListener('click', () => this.onChangeStatus());
		this.removeBtn.addEventListener('click', () => this.onRemoveItem());
		this.textInput.addEventListener('change', () => this.onChangeText());
	}

	/**
	 * Отписка от всех событий
	 */
	unSubscribeEvents() {
		this.iconStatus.removeEventListener('click', () => this.onChangeStatus());
		this.removeBtn.removeEventListener('click', () => this.onRemoveItem());
		this.textInput.removeEventListener('change', () => this.onChangeText());
	}

	/**
	 * Вызывает событие изменения задачи из списка дел
	 */
	dispatchEditTodo() {
		window.dispatchEvent(new CustomEvent('editTodo', {
			detail: this.collectDataTodoItem(false)
		}));
	}

	/**
	 * Вызывает событие удаления задачи из списка дел
	 */
	dispatchDeleteTodo() {
		window.dispatchEvent(new CustomEvent('deleteTodo', { 
			detail: this.collectDataTodoItem()
		}));
	}

	/**
	 * Собирает все пропсы в объект
	 * @param {Boolean} needDate - флаг
	 * @returns {Object}
	 */
	collectDataTodoItem(needDate = true) {
		if (needDate) {
			return {
				id: this.getAttribute('task-id'),
				text: this.getAttribute('text'),
				date: this.getAttribute('date'),
				status: this.getAttribute('status')
			}
		} else {
			return {
				id: this.getAttribute('task-id'),
				text: this.getAttribute('text'),
				status: this.getAttribute('status')
			}
		}
		
	}

	/**
	 * Отрисовка элемента
	 */
	render() {		
		this._template = template.content.cloneNode(true);

		this._iconStatus = this.template.querySelector('.icon-status');
		this._removeBtn = this.template.querySelector('.remove-item');
		this._textInput = this.template.querySelector('label input[type=text]');

		this.shadowRoot.innerHTML = '';

		this.template.querySelector('li').setAttribute('task-id', this.getAttribute('task-id'));
		this.template.querySelector('input[type=checkbox]').setAttribute('name', this.getAttribute('task-id'));
		this.template.querySelector('label').setAttribute('for', this.getAttribute('task-id'));
		this.template.querySelector('label input[type=text]').value = this.getAttribute('text');
		this.template.querySelector('.date').innerText = this.getAttribute('date');

		//Отображает определенный индикатор статуса в зависимости от статуса задания
		if (this.getAttribute('status') === 'done') {
			this.template.querySelector('.icon-status').innerHTML = statusDone;
			this.template.querySelector('label input[type=text]').style.textDecoration = 'line-through';
		} else {
			this.template.querySelector('.icon-status').innerHTML = statusWaiting;
		}

		this.shadowRoot.appendChild(this.template);
	}
}