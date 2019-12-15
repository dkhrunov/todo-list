const template = document.createElement('template');

template.innerHTML = `
	<style>
		
	</style>
	<div class="app-name">Todo List</div>
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
		this.shadowRoot.appendChild(this.template);
	}
}