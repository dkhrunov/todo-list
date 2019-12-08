import TodoItemComponent from './TodoItemComponent.js';
import { generateRandomNum, formatDate } from '../Utilities/utilities.js';

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
		
		this.list = [
			{
				id: generateRandomNum(),
				text: 'Повседневная практика показывает, что начало повседневной работы.',
				date: new Date('2019-10-17T03:24:00'),
				status: 'waiting'
			},
			{
				id: generateRandomNum(),
				text: 'Повседневная практика показывает, что социально-экономическое развитие.',
				date: new Date('2018-09-01T03:24:00'),
				status: 'waiting'
			},
			{
				id: generateRandomNum(),
				text: 'Сделать тесты по всем предметам.',
				date: new Date('2019-01-10T03:24:00'),
				status: 'done'
			},
			{
				id: generateRandomNum(),
				text: 'Повседневная практика показывает, что начало повседневной работы.',
				date: new Date('2019-10-17T03:24:00'),
				status: 'waiting'
			},
			{
				id: generateRandomNum(),
				text: 'Повседневная практика показывает, что социально-экономическое развитие.',
				date: new Date('2018-09-01T03:24:00'),
				status: 'waiting'
			},
			{
				id: generateRandomNum(),
				text: 'Сделать тесты по всем предметам.',
				date: new Date('2019-01-10T03:24:00'),
				status: 'done'
			},
			{
				id: generateRandomNum(),
				text: 'Повседневная практика показывает, что начало повседневной работы.',
				date: new Date('2019-10-17T03:24:00'),
				status: 'waiting'
			},
			{
				id: generateRandomNum(),
				text: 'Повседневная практика показывает, что социально-экономическое развитие.',
				date: new Date('2018-09-01T03:24:00'),
				status: 'waiting'
			},
			{
				id: generateRandomNum(),
				text: 'Сделать тесты по всем предметам.',
				date: new Date('2019-01-10T03:24:00'),
				status: 'done'
			},
			{
				id: generateRandomNum(),
				text: 'Повседневная практика показывает, что начало повседневной работы.',
				date: new Date('2019-10-17T03:24:00'),
				status: 'waiting'
			},
			{
				id: generateRandomNum(),
				text: 'Повседневная практика показывает, что социально-экономическое развитие.',
				date: new Date('2018-09-01T03:24:00'),
				status: 'waiting'
			},
			{
				id: generateRandomNum(),
				text: 'Сделать тесты по всем предметам.',
				date: new Date('2019-01-10T03:24:00'),
				status: 'done'
			},
		];

		this._ListWithoutFilters = this.list;
	}

	/**
	 * Сортирует список дел по дате (от новых к старым)
	 */
	sortListByDate() {
		this.list.sort((curr, next) => {
			return next.date-curr.date;
		})
	}

	/**
	 * @returns {HTMLTemplateElement}
	 */
	get template() { return this._template; }

	connectedCallback() {
		this.render();
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
		// вызывается при изменении одного из перечисленных выше атрибутов
	}
	// <-- TODO РЕАЛИЗОВАТЬ ЭТИ ДВА МЕТОДА

	/**
	 * Обновляет список и рендерит новый список дел
	 * @param {Event} event 
	 */
	onCreateTodo(event) {
		this.addTodoToList(event.detail);
		this.render();
	}

	/**
	 * Удаляет элемент из списка дел и рендерит новый список дел
	 * @param {Event} event 
	 */
	onDeleteTodo(event) {
		this.deleteTodoFromList(event.detail.id);
		//this.render();
	}

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
		window.addEventListener('createTodo', (event) => this.onCreateTodo(event));
		window.addEventListener('deleteTodo', (event) => this.onDeleteTodo(event));
		window.addEventListener('editTodo', (event) => this.onEditTodo(event));
		window.addEventListener('filterTodo', (event) => this.onFilterTodo(event));
	}

	/**
	 * Отписка от всех событий
	 */
	unSubscribeEvents() {
		window.removeEventListener('createTodo', (event) => this.onCreateTodo(event));
		window.removeEventListener('deleteTodo', (event) => this.onDeleteTodo(event));
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
	 * Добваляет новое задание в список
	 * @param {Object} data
	 */
	addTodoToList(data) {
		this.list.push({
			id: generateRandomNum(),
			text: data.text,
			date: data.date,
			status: data.status
		});
	}

	/**
	 * Удаляет из списка дел элемент по id
	 * @param {String} id
	 */
	deleteTodoFromList(id) {
		this.list = this.list.filter(item => item.id !== id);
	}

	/**
	 * Заменяет значения задачи на новые в списке дел
	 * @param {Object} data
	 */
	editTodoInList(data) {
		let todo = this.findTodoInList(data.id);
		// заменяет в первом аргументе одинаковые поля со вторым аргументом, на значения второго аргумента
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
	 */
	render() {
		this._template = template.content.cloneNode(true);
		
		this.shadowRoot.innerHTML = '';

		const fragment = document.createDocumentFragment();
		
		this.sortListByDate();

		this.list.map( ({ id, text, date, status }) => {
			const todoItem = document.createElement('todo-item');
			todoItem.setAttribute('task-id', id);
			todoItem.setAttribute('text', text);
			todoItem.setAttribute('date', formatDate(date));
			todoItem.setAttribute('status', status);
			fragment.appendChild(todoItem);
		});

		this.template.querySelector('ul').appendChild(fragment);
		this.shadowRoot.appendChild(this.template);

		//setInterval(() => console.log(this.list), 5000);
	}
}