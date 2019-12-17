import Store from '../Store/Store.js';


export default class CounterComponent extends HTMLElement {

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

	checkRelevance(amount) {
		if (amount === 0) {
			this.template.querySelector('.counter').style.background = '#cccccccc';
			this.template.querySelector('.counter').style.color = '#757575';
			this.template.querySelector('.wrapper').style.borderBottomColor = 'transparent';
		}
	}

	/**
	 * Оформление подписок событий элемента
	 */
	subscribeEvents() {
		Store.events.subscribe('change', () => this.render());
	}

	/**
	 * Отписка от всех событий
	 */
	unSubscribeEvents() {
		Store.events.unsubscribe('change', () => this.render());
	}

	/**
	 * Абстрактный метод отрисовки
	 */
	render() { }
}