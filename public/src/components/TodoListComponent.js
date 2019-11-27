import Component from './Component.js';
import TodoItemComponent from './TodoItemComponent.js';

export default class TodoListComponent extends Component {
	constructor(anchor, props) {
		super(anchor, props);
	}

	installListeners() {
		this.anchor.addEventListener('click', event => {
			if (event.target.localName !== 'span') return;
			this.props = {
				//...this.props,
				items: [
					...this.props.items.filter((item, i) => i != event.target.id)
				]
			}
		})
	}

	render() {
		super.render();

		let list = document.createElement('ul');
		list.classList.add('todo-list');

		this.props.items.map((item, i) => {
			const todoItemComponent = new TodoItemComponent(document.createElement('li'), { item: { text: item.text, id: i } });
			list.innerHTML +=	todoItemComponent.render();
		})

		this.clearAnchor();
		this.addChild(list);
		
		return this.HtmlAsString();
	}
}