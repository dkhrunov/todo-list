import Store from '../Store/Store.js';
import { addTodo } from '../Store/Actions.js';
import { parseStringToBoolean } from '../Utilities/utilities.js';
import ApiTodo from '../Api/TodoApi.js';

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
	}

	/**
	 * @returns {HTMLTemplateElement}
	 */
	get template() { return this._template; }

	connectedCallback() {
		this.fetchTodos();
		this.render(Store.state.todo);
		this.subscribeEvents();
	}

	disconnectedCallback() {
		this.unSubscribeEvents();
	}

	/**
	 * Получает todo из Api и отсылает их в Store
	 */
	fetchTodos() {
		ApiTodo.getAllTodo()
			.then(res => Store.dispatch(addTodo(res)))
			.catch(error => console.error(error));
	}

	/**
	 * Оформление подписок событий элемента
	 */
	subscribeEvents() {
		Store.subscribe('change', storeState => this.render(storeState.todo));
	}

	/**
	 * Отписка от всех событий
	 */
	unSubscribeEvents() {
		Store.unsubscribe('change', storeState => this.render(storeState.todo));
	}

	/**
	 * Вовзращает <h2></h2> элемент с текстом
	 * @returns {HTMLElement}
	 */
	generateMessage(text) {
		const message = document.createElement('h2');
		message.innerHTML = text;
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
		
		// Сообщение для пользователя, что todo list пустой
		if (todo.length === 0) {
			this.shadowRoot.appendChild(this.generateMessage('Список пуст, добавьте новые задачи!'));
			return;
		}

		// Фильтрация todo списка
		if (Store.state.selectedFilter !== 'all') {
			todo = todo.filter(item => item.completed === parseStringToBoolean(Store.state.selectedFilter));
		}

		todo.map( ({ _id, text, createDate, completed }) => {
			const todoItem = document.createElement('todo-item');
			todoItem.setAttribute('task-id', _id);
			todoItem.setAttribute('text', text);
			todoItem.setAttribute('createDate', createDate);
			todoItem.setAttribute('completed', completed);
			fragment.appendChild(todoItem);
		});

		this.template.querySelector('ul').appendChild(fragment);
		this.shadowRoot.appendChild(this.template);
	}
}