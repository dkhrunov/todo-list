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
	onChangeStatus() {
		if (this.getAttribute('status') === 'waiting') {
			this.setAttribute('status', 'done');
			
			//TODO Исправить как в CreateItemComponent
			this.shadowRoot.querySelector('label input[type=text]').style.textDecoration = 'line-through';
			this.shadowRoot.querySelector('.icon-status').innerHTML = statusDone;
		}
		else if (this.getAttribute('status') === 'done') {
			this.setAttribute('status', 'waiting');

			//TODO Исправить как в CreateItemComponent
			this.shadowRoot.querySelector('label input[type=text]').style.textDecoration = '';
			this.shadowRoot.querySelector('.icon-status').innerHTML = statusWaiting;
		}
	}

	/**
	 * Удаляет задание из общего списка
	 */
	onRemoveItem() {
		this.remove();
	}

	/**
	 * Оформление подписок событий элемента
	 */
	subscribeEvents() {
		//TODO Исправить как в CreateItemComponent
		this.shadowRoot.querySelector('.icon-status').addEventListener('click', () => this.onChangeStatus());
		this.shadowRoot.querySelector('.remove-item').addEventListener('click', () => this.onRemoveItem());
	}

	/**
	 * Отписка от всех событий
	 */
	unSubscribeEvents() {
		//TODO Исправить как в CreateItemComponent
		this.shadowRoot.querySelector('.icon-status').removeEventListener('click', () => this.onChangeStatus());
		this.shadowRoot.querySelector('.remove-item').removeEventListener('click', () => this.onRemoveItem());
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

		//text-decoration: line-through;
		if (status === 'done') {
			this.template.querySelector('.icon-status').innerHTML = statusDone;
			this.template.querySelector('label input[type=text]').style.textDecoration = 'line-through';
		} else {
			this.template.querySelector('.icon-status').innerHTML = statusWaiting;
		}

		this.shadowRoot.appendChild(this.template);
	}
}