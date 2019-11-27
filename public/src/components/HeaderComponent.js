import Component from './Component.js';

export default class HeaderComponent extends Component {
	constructor(anchor, props) {
		super(anchor, props);
	}

	render() {
		super.render();
		return this.props.text;
	}
}