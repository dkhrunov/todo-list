import Store from '../Store/Store.js';

const template = document.createElement('template');

template.innerHTML = `
	<style>
		.counter {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 40px;
			height: 30px;
			color: #af7eeb;
			background: white;
			border-radius: 5px;
			margin-left: 10px;
		}
		
		.wrapper {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 20px;
			height: calc(100% - 2px);
			border-bottom: 2px solid white;
		}

		span {
			font-size: 0.5em;
		}
	</style>

	<div class="wrapper">
		<span></span>
		<div class="counter"></div>
	</div>
`;


export default class CounterComponent extends HTMLElement {

	_template;
	_templateContent;

	constructor() {
		super();
		this.attachShadow({mode: "open"});
		this._template = template;
	}

	/**
	 * @returns {HTMLTemplateElement}
	 */
	get template() { return this._template; }

	/**
	 * @returns {HTMLTemplateElement}
	 */
	get templateContent() { return this._templateContent; }

	connectedCallback(){
		this.render();
		this.subscribeEvents();
	}

	disconnectedCallback() {
		this.unSubscribeEvents();
	}

	checkRelevance(amount) {
		if (amount === 0) {
			this.templateContent.querySelector('.counter').style.background = '#cccccccc';
			this.templateContent.querySelector('.counter').style.color = '#757575';
			this.templateContent.querySelector('.wrapper').style.borderBottomColor = 'transparent';
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