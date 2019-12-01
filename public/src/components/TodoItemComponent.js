const template = document.createElement('template');
const statusWaiting = '<i class="fa fa-circle-o status-waiting" aria-hidden="true"></i>';
const statusDone = '<i class="fa fa-check-circle status-done" aria-hidden="true"></i>';

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
			color: #3b064d;
		}

		li:hover input[type=text] {
			color: #3b064d;
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

		input[type=text]:focus {
			color: #3b064d;
			border: none;
		}

		.date {
			margin: 0 15px;
		}

		.icon-status {
			font-size: 1.3em;
			cursor: pointer;
		}

		.status-done {
			color: green;
		}

		.status-waiting {
			color: #999fc0;
		}

		.remove-item {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 5%;
			font-size: 1.3em;
			cursor: pointer;
			color: red;
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

	constructor() {
		super();
		this.attachShadow({mode: "open"});
		this._template = template.content.cloneNode(true);
	}

	/**
	 * @returns {HTMLTemplateElement}
	 */
	get template() { return this._template }

	connectedCallback(){
		this.render();
		this.subscribeEvents();
	}

	disconnectedCallback() {
		this.unSubscribeEvents();
	}

	/**
	 * Изменяет статус задания
	 */
	handlerChangeStatus() {
		if (this.getAttribute('status') === 'waiting') {
			this.setAttribute('status', 'done');
			this.shadowRoot.querySelector('.icon-status').innerHTML = statusDone;
		}
		else if (this.getAttribute('status') === 'done') {
			this.setAttribute('status', 'waiting');
			this.shadowRoot.querySelector('.icon-status').innerHTML = statusWaiting;
		}
	}

	/**
	 * Удаляет задание из общего списка
	 */
	handlerRemoveItem() {
		this.remove();
	}

	/**
	 * Оформление подписок событий элемента
	 */
	subscribeEvents() {
		this.shadowRoot.querySelector('.icon-status').addEventListener('click', () => this.handlerChangeStatus());
		this.shadowRoot.querySelector('.remove-item').addEventListener('click', () => this.handlerRemoveItem());
	}

	/**
	 * Отписка от всех событий
	 */
	unSubscribeEvents() {
		this.shadowRoot.querySelector('.icon-status').removeEventListener('click', () => this.handlerChangeStatus());
		this.shadowRoot.querySelector('.remove-item').removeEventListener('click', () => this.handlerRemoveItem());
	}

	/**
	 * Отрисовка элемента
	 */
	render() {
		const id = this.getAttribute('task-id');
		const text = this.getAttribute('text');
		const date = this.getAttribute('date');
		const status = this.getAttribute('status');

		this.shadowRoot.innerHTML = '';

		this.template.querySelector('li').setAttribute('task-id', id);
		this.template.querySelector('input[type=checkbox]').setAttribute('name', id);
		this.template.querySelector('label').setAttribute('for', id);
		this.template.querySelector('label input[type=text]').value = text;
		this.template.querySelector('.date').innerText = date;

		if (status === 'done') {
			this.template.querySelector('.icon-status').innerHTML = statusDone;
		} else {
			this.template.querySelector('.icon-status').innerHTML = statusWaiting;
		}

		this.shadowRoot.appendChild(this.template);
	}
}