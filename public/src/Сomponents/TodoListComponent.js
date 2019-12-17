import TodoItemComponent from './TodoItemComponent.js';
import Store from '../Store/Store.js';

customElements.define('todo-item', TodoItemComponent);

const template = document.createElement('template');

template.innerHTML = `
	<style>
		ul {
			display: flex;
			flex-direction: column;
			justify-content: center;
			width: 100%;
			margin: 0;
			padding-left: 0;
		}
	</style>
	
	<ul>
	</ul>
`;

export default class TodoListComponent extends HTMLElement {

	_template;

	constructor() {
		super();
		this.attachShadow({mode: "open"});
		this.store = Store;
	}

	/**
	 * @returns {HTMLTemplateElement}
	 */
	get template() { return this._template; }

	connectedCallback() {
		this.render(Store.state.todo);
		this.subscribeEvents();
	}

	disconnectedCallback() {
		this.unSubscribeEvents();
	}

	// TODO РЕАЛИЗОВАТЬ ЭТИ ДВА МЕТОДА -->
	static get observedAttributes() {
		return [/* массив имён атрибутов для отслеживания их изменений */];
	}
  
	attributeChangedCallback(name, oldValue, newValue) {
		/* вызывается при изменении одного из перечисленных выше атрибутов */
	}
	// <-- TODO РЕАЛИЗОВАТЬ ЭТИ ДВА МЕТОДА

	/**
	 * Оформление подписок событий элемента
	 */
	subscribeEvents() {
		Store.events.subscribe('change', state => this.render(state.todo));
	}

	/**
	 * Отписка от всех событий
	 */
	unSubscribeEvents() {
		Store.events.unsubscribe('change', state => this.render(state.todo));
	}

	/**
	 * Вовзращает <h2></h2> элемент с текстом
	 * @returns {HTMLElement}
	 */
	generateMessage() {
		const message = document.createElement('h2');
		message.innerHTML = 'Список пуст, добавьте новые задачи!';
		message.style.color = '#af7eeb';
		message.style.textAlign = 'center';
		return message;
	}

	/**
	 * Отрисовка элемента
	 * @param {Array} todo
	 */
	render(todo) {
		this._template = template.content.cloneNode(true);
		
		this.shadowRoot.innerHTML = '';

		const fragment = document.createDocumentFragment();

		// TODO сделать более понятным отображение пустого списка
		if (todo.length === 0) {
			this.shadowRoot.appendChild(this.generateMessage());
			return;
		}

		// TODO сделать более понятным сортировку
		if (this.store.state.selectedFilter !== 'all') {
			todo = todo.filter(item => item.status === this.store.state.selectedFilter);
		}

		todo.map( ({ id, text, date, status }) => {
			const todoItem = document.createElement('todo-item');
			todoItem.setAttribute('task-id', id);
			todoItem.setAttribute('text', text);
			todoItem.setAttribute('date', date);
			todoItem.setAttribute('status', status);
			fragment.appendChild(todoItem);
		});

		this.template.querySelector('ul').appendChild(fragment);
		this.shadowRoot.appendChild(this.template);
	}
}