import Component from './Component.js';

export default class TodoItemComponent extends Component {
	constructor(anchor, props) {
		super(anchor, props);
	}

	installListeners() {
		
	}

	render() {
		super.render();

		const {
			text,
			id,
		} = this.props.item;

		this.anchor.innerHTML = `
			<input type="checkbox" name="${text}">
			<label for="${text}">${text}</label><span id='${id}'>X</span>
		`;

		return this.anchorAsString();
	}
}