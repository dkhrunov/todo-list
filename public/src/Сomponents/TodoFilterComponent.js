const template = document.createElement('template');

template.innerHTML = `
	<style>
		.todo-filter {
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 100%;
			background: white;
			color: #20202038;
			text-transform: uppercase;
		}

		.todo-filter div {
			cursor: pointer;
			-moz-user-select: none;
			-ms-user-select: none;
			-o-user-select: none;
			-webkit-user-select: none;
		}

		.todo-filter_active {
			color: #af7eeb;
			font-weight: bolder;
		}
	</style>
	<div class="todo-filter">
		<div class="todo-filter_active" filter="all">Все</div>
		<div filter="done">Завершенные</div>
		<div filter="waiting">Незавершенные</div>
	</div>
`;

export default class TodoFilterComponent extends HTMLElement {

	_template;
	_currentFilter;
	_filters;

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
	get filters() { return this._filters; }

	/**
	 * @returns {HTMLTemplateElement}
	 */
	get currentFilter() { return this._currentFilter; }

	/**
	 * @param {HTMLTemplateElement} element
	 */
	set currentFilter(element) { this._currentFilter = element; }

	connectedCallback(){
		this.render();
		this.subscribeEvents();
	}

	disconnectedCallback() {
		this.unSubscribeEvents();
	}

	/**
	 * Меняет текущию элемент фильтра и выделяет его
	 * @param {HTMLTemplateElement} newFilter 
	 */
	changeCurrentFilter(newFilter) {
		this.currentFilter.classList.remove('todo-filter_active');
		newFilter.classList.add('todo-filter_active');
		this.currentFilter = newFilter;
	}

	/**
	 * Проверяет, что клик происходит по тому же (уже активному) фильтру
	 * @param {HTMLTemplateElement} newFilter
	 * @returns {Boolean} 
	 */
	isSameFilterClicked(newFilter) {
		if (this.currentFilter == newFilter) { return true; } 

		return false;
	}

	/**
	 * Обрабитчик клика по фильтру
	 * @param {Event} event 
	 */
	onClickFilter(event) {
		if ( !this.isSameFilterClicked(event.path[0]) ) {
			this.dispatchFilterTodo(event.path[0].attributes.filter.value);
			this.changeCurrentFilter(event.path[0]);
		}
	}

	/**
	 * Оформление подписок событий элемента
	 */
	subscribeEvents() {
		this.filters.forEach(filter => filter.addEventListener('click', (event) => this.onClickFilter(event)));
	}

	/**
	 * Отписка от всех событий
	 */
	unSubscribeEvents() {
		this.filters.forEach(filter => filter.removeEventListener('click', (event) => this.onClickFilter(event)));
	}

	/**
	 * Фильтрация списка дел по парметру
	 * @param {String} filter - может быть all, done, waiting 
	 */
	dispatchFilterTodo(filter) {
		Store.dispatch('changeFilter', filter);		
	}

	/**
	 * Отрисовка элемента
	 */
	render() {		
		this._template = template.content.cloneNode(true);

		this._filters = this.template.querySelectorAll('.todo-filter div');
		this.currentFilter = this.template.querySelector('.todo-filter_active');

		this.shadowRoot.innerHTML = '';

		this.shadowRoot.appendChild(this.template);
	}
}