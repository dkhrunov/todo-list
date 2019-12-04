import routerConfig from '../routerConfig.js';

export default class Router {
	constructor(anchor){
		this.anchor = anchor;
	}

	changeRoute(route) {
		const conf = routerConfig[route];

		if (!conf) return;

		window.history.pushState(conf.data, '', conf.route);

		const component = new conf.component();

		const DOMElement = component.render();

		if (this.currentDomComponent) {
			this.anchor.innerHTML = '';
			this.anchor.appendChild(DOMElement);;
		} else {
			this.anchor.appendChild(DOMElement);;
		}

		this.currentDomComponent  = DOMElement;
	}
}