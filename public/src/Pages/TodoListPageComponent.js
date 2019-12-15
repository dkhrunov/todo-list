// TODO разбить логику render
export default class TodoListPageComponent {
	constructor() {
		this.fragment = document.createDocumentFragment();
	}

	/**
	 * Отрисовка страницы
	 */
	render() {
		const headerBlock = document.createElement('div');
		headerBlock.classList.add('header');
		this.fragment.appendChild(headerBlock);

		const contentBlock = document.createElement('div');
		contentBlock.classList.add('content');
		this.fragment.appendChild(contentBlock);

		const createItemBlock = document.createElement('div');
		createItemBlock.id = 'create-item';
		contentBlock.appendChild(createItemBlock);

		const todoFilterBlock = document.createElement('div');
		todoFilterBlock.id = 'todo-filter';
		contentBlock.appendChild(todoFilterBlock);

		const todoListBlock = document.createElement('div');
		todoListBlock.id = 'todo-list';
		contentBlock.appendChild(todoListBlock);

		const headerComponent = document.createElement('header-component');
		const createItem = document.createElement('create-item');
		const todoFilter = document.createElement('todo-filter');
		const todoList = document.createElement('todo-list');

		headerBlock.appendChild(headerComponent);
		createItemBlock.appendChild(createItem);
		todoFilterBlock.appendChild(todoFilter);
		todoListBlock.appendChild(todoList);

		return this.fragment;
	}
}