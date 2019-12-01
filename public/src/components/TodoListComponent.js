import TodoItemComponent from './TodoItemComponent.js';

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

const generateId = () => String(Math.round(Date.now() * Math.random()));

export default class TodoListComponent extends HTMLElement {

	_template;

	constructor() {
		super();
		this.attachShadow({mode: "open"});
		this.list = [
			{
				id: generateId(),
				text: 'Повседневная практика показывает, что начало повседневной работы.',
				date: '03.12.2019',
				status: 'waiting'
			},
			{
				id: generateId(),
				text: 'Повседневная практика показывает, что социально-экономическое развитие.',
				date: '20.11.2019',
				status: 'waiting'
			},
			{
				id: generateId(),
				text: 'Сделать тесты по всем предметам.',
				date: '01.10.2019',
				status: 'done'
			},
			{
				id: generateId(),
				text: 'Таким образом, социально-экономическое развитие способствует подготовке.',
				date: '31.08.2019',
				status: 'waiting'
			},
			{
				id: generateId(),
				text: 'Не следует, однако, забывать о том, что реализация намеченного плана.',
				date: '02.12.2019',
				status: 'waiting'
			},
			{
				id: generateId(),
				text: 'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.',
				date: '20.11.2019',
				status: 'waiting'
			},
			{
				id: generateId(),
				text: 'Excepteur sint occaecat cupidatat non proident, consectetur adipiscing elit?',
				date: '01.10.2019',
				status: 'done'
			},
			{
				id: generateId(),
				text: 'Не следует, однако, забывать о том, что реализация намеченного плана.',
				date: '31.08.2019',
				status: 'done'
			},
			{
				id: generateId(),
				text: 'Повседневная практика показывает, что социально-экономическое развитие играет важную роль.',
				date: '01.12.2019',
				status: 'done'
			},
			{
				id: generateId(),
				text: 'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.',
				date: '20.11.2019',
				status: 'waiting'
			},
			{
				id: generateId(),
				text: 'Sed ut perspiciatis, qui in ea voluptate velit esse, quam nihil molestiae consequatur.',
				date: '01.10.2019',
				status: 'waiting'
			},
			{
				id: generateId(),
				text: 'Excepteur sint occaecat cupidatat non proident, unde omnis iste natus error sit voluptatem.',
				date: '31.08.2019',
				status: 'waiting'
			},
			{
				id: generateId(),
				text: 'Повседневная практика показывает, что социально-экономическое развитие.',
				date: '01.12.2019',
				status: 'waiting'
			},
		];
	}

	/**
	 * @returns {HTMLTemplateElement}
	 */
	get template() { return this._template }

	connectedCallback() {
		this.render();
	}

	disconnectedCallback() {

	}

	// installListeners() {
	// 	this.anchor.addEventListener('click', event => {
	// 		if (event.target.localName !== 'span') return;
	// 		this.props = {
	// 			//...this.props,
	// 			items: [
	// 				...this.props.items.filter((item, i) => i != event.target.id)
	// 			]
	// 		}
	// 	})
	// }

	/**
	 * Отрисовка элемента
	 */
	render() {
		this.shadowRoot.innerHTML = '';
		this._template = template.content.cloneNode(true);

		const fragment = document.createDocumentFragment();

		this.list.map( ({ id, text, date, status }) => {
			const todoItem = document.createElement('todo-item');
			todoItem.setAttribute('task-id', id);
			todoItem.setAttribute('text', text);
			todoItem.setAttribute('date', date);
			todoItem.setAttribute('status', status);
			fragment.appendChild(todoItem);
		});

		this.template.querySelector('ul').appendChild(fragment);
		this.shadowRoot.appendChild(this.template);

		// let list = document.createElement('ul');
		// list.classList.add('todo-list');

		// this.props.items.map((item, i) => {
		// 	const todoItemComponent = new TodoItemComponent(document.createElement('li'), { item: { text: item.text, id: i } });
		// 	list.innerHTML +=	todoItemComponent.render();
		// })

		// this.clearAnchor();
		// this.addChild(list);
		
		// return this.HtmlAsString();
	}
}