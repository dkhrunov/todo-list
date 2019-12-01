import Component from './Component.js';

export default class HeaderComponent extends Component {
	constructor(anchor, props) {
		super(anchor, props);
	}

	render() {
		return `
			<div class="app-name">${this.props.appName}</div>
		`;
		let appName = document.createElement('div');
		appName.classList.add('app-name');
		appName.style.marginLeft = '10px';
		appName.innerText = this.props.appName;
		this.anchor.appendChild(appName);
	}
}