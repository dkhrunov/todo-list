import Component from './Component.js';

export default class FooterComponent extends Component {
	constructor(anchor, props) {
		super(anchor, props);
	}

	render() {
		super.render();
		return `
				<hr>
				${this.props.text}
		`;
	}
}