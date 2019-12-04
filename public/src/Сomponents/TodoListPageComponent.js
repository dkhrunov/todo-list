import HeaderComponent from './HeaderComponent.js';

// TODO разбить логику render
export default class TodoListPageComponent {
	constructor() {
		this.fragment = document.createDocumentFragment();
	}

	/**
	 * Отрисовка элемента
	 */
	render() {
		const headerElement = document.createElement('div');
		headerElement.classList.add('header');
		this.fragment.appendChild(headerElement);

		const contentElement = document.createElement('div');
		contentElement.classList.add('content');
		this.fragment.appendChild(contentElement);

		const createItemElement = document.createElement('div');
		createItemElement.id = 'create-item';
		contentElement.appendChild(createItemElement);

		const todoListElement = document.createElement('div');
		todoListElement.id = 'todo-list';
		contentElement.appendChild(todoListElement);

		const header = new HeaderComponent(headerElement, { appName: 'Todo List' });
		const createItem = document.createElement('create-item');
		const todoList = document.createElement('todo-list');

		createItemElement.appendChild(createItem);
		todoListElement.appendChild(todoList);

		return this.fragment;
	}
}