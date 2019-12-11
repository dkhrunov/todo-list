import TodoItemComponent from './TodoItemComponent.js';
import { formatDate } from '../Utilities/utilities.js';
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
			margin-left: 0;
			padding-left: 0;
		}
	</style>
	
	<ul>
	</ul>
`;

export default class TodoListComponent extends HTMLElement {

	_template;
	_ListWithoutFilters;

	constructor() {
		super();
		this.attachShadow({mode: "open"});
		this.store = Store;
		this.list = Store.state.todo;

		this._ListWithoutFilters = this.list;
	}

	/**
	 * Сортирует список дел по дате (от новых к старым)
	 * и возвращает отсортированный массив
	 * @param {Array} todo
	 * @returns {Array}
	 */
	sortTodoByDate(todo) {
		return todo.sort((curr, next) => next.date-curr.date);
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
	 * Редактирует задачу в списке дел 
	 * @param {Event} event 
	 */
	onEditTodo(event) {
		this.editTodoInList(event.detail);
	}

	/**
	 * Фильтрует список дел
	 * @param {Event} event 
	 */
	onFilterTodo(event) {
		this.filterTodoList(event.detail.filteredBy)
		this.render();
	}


	/**
	 * Оформление подписок событий элемента
	 */
	subscribeEvents() {
		Store.events.subscribe('change', state => this.render(state.todo) );
		window.addEventListener('editTodo', (event) => this.onEditTodo(event));
		window.addEventListener('filterTodo', (event) => this.onFilterTodo(event));
	}

	/**
	 * Отписка от всех событий
	 */
	unSubscribeEvents() {
		Store.events.subscribe('change', state => this.render(state.todo) );
		window.removeEventListener('editTodo', (event) => this.onEditTodo(event));
		window.removeEventListener('filterTodo', (event) => this.onFilterTodo(event));
	}

	/**
	 * Вовзращает найденный по id объект списка дел
	 * @param {String} id 
	 * @returns {Object}
	 */
	findTodoInList(id) {
		return this.list.filter(item => item.id === id)[0];
	}

	/**
	 * Заменяет значения задачи на новые в списке дел
	 * @param {Object} data
	 */
	editTodoInList(data) {
		let todo = this.findTodoInList(data.id);
		/* заменяет в первом аргументе одинаковые поля со вторым аргументом, на значения второго аргумента */
		Object.assign(todo, data);
	}

	/**
	 * Фильтрация списка дел по парметру
	 * @param {String} filter - может быть all, done, waiting 
	 */
	filterTodoList(filter) {
		this.list = this._ListWithoutFilters;
		if (filter === 'all') {
			return;
		} else {
			this.list = this.list.filter(item => item.status === filter);
		}
	}

	/**
	 * Отрисовка элемента
	 * @param {Array} todo
	 */
	render(todo) {
		this._template = template.content.cloneNode(true);
		
		this.shadowRoot.innerHTML = '';

		const fragment = document.createDocumentFragment();

		this.sortTodoByDate(todo).map( ({ id, text, date, status }) => {
			const todoItem = document.createElement('todo-item');
			todoItem.setAttribute('task-id', id);
			todoItem.setAttribute('text', text);
			todoItem.setAttribute('date', date);
			todoItem.setAttribute('status', status);
			fragment.appendChild(todoItem);
		});

		this.template.querySelector('ul').appendChild(fragment);
		this.shadowRoot.appendChild(this.template);

		//setInterval(() => console.log(this.list), 5000);
	}
}