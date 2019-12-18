import { makeCounter } from './CounterComponentFactory.js';

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

	render() {
		this._template = template.content.cloneNode(true);
		this.shadowRoot.innerHTML = '';

		this.template.querySelector('.countres').appendChild(makeCounter('counter-all'));
		this.template.querySelector('.countres').appendChild(makeCounter('counter-done'));
		this.template.querySelector('.countres').appendChild(makeCounter('counter-waiting'));
		
		this.shadowRoot.appendChild(this.template);
	}
}