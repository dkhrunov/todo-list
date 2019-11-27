import Component from './Component.js';

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

		return `
			<ul class="todo-list">
				${
					this.props.items.map((item, i) => `
						<li>${item} <span id='${i}'>X</span></li>
					`).join('')
				}
			</ul>
		`;
	}
}