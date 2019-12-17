import CounterComponentFactory from './CounterComponentFactory.js';

customElements.define('counter-all', new CounterComponentFactory('all'));
customElements.define('counter-done', new CounterComponentFactory('done'));
customElements.define('counter-waiting', new CounterComponentFactory('waiting'));

const template = document.createElement('template');

template.innerHTML = `
	<style>
		.countres {
			display: flex;
			justify-content: space-around;
			align-items: center;
			height: 100%;
		}
	</style>
	<div class="app-name">Todo List</div>
	<div class="countres"></div>
`;


export default class HeaderComponent extends HTMLElement {

	_template;

	constructor() {
		super();
		this.attachShadow({mode: "open"});		
	}

	/**
	 * @returns {HTMLTemplateElement}
	 */
	get template() { return this._template; }

	connectedCallback(){
		this.render();
		this.subscribeEvents();
	}

	disconnectedCallback() {
		this.unSubscribeEvents();
	}

	/**
	 * Оформление подписок событий элемента
	 */
	subscribeEvents() {

	}

	/**
	 * Отписка от всех событий
	 */
	unSubscribeEvents() {
		
	}

	makeCounter(tag) {
		const counter = document.createElement(tag);
		counter.style.height = '100%';
		return counter;
	}

	render() {
		this._template = template.content.cloneNode(true);
		this.shadowRoot.innerHTML = '';

		this.template.querySelector('.countres').appendChild(this.makeCounter('counter-all'));
		this.template.querySelector('.countres').appendChild(this.makeCounter('counter-done'));
		this.template.querySelector('.countres').appendChild(this.makeCounter('counter-waiting'));
		
		this.shadowRoot.appendChild(this.template);
	}
}