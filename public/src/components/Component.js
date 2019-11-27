export default class Component {
	constructor(anchor, props) {
		this.anchor = anchor ? anchor : document.createElement('div');
		this.props = props;
		this.onCreate();
		this.installListeners();
	}

	set anchor(value) {
		this._anchor = value;
	}

	get anchor() {
		return this._anchor;
	}

	set props(value) {
		this._props = value;
		this.onPropsChange();
	}

	get props() {
		return this._props;
	}

	onCreate() {
		console.log('Component created!');
	}

	installListeners() {}

	onPropsChange() {
		this.anchor.innerHTML = this.render();
	}

	render() {}

	onDestroy() {
		this.anchor.innerHTML = null;
	}

	// Методы для композиции компонента

	/**
	 * Добавляет себя в переданный параметр HTMLElement
	 * @param {HTMLElement} parent 
	 * @returns {HTMLElement}
	 */
	setSelfTo(parent) {
		parent.appendChild(this.anchor);
		return parent;
	}

	/**
	 * Добавляет дочерний елемент
	 * @param {HTMLElement} element 
	 */
	addChild(element) {
		 this.anchor.appendChild(element);
	}

	/**
	 * Добавляет дочерние елементы
	 * @param {Array} elements 
	 */
	addChilds(elements) {
		elements.map(element => this.anchor.appendChild(element));
	}

	/**
	 * Возвращает строку разметки
	 * @returns {String}
	 */
	HtmlAsString() {
		return this.anchor.innerHTML;
	}

	/**
	 * Возвращает корневой елемент как строку разметки
	 * @returns {String}
	 */
	anchorAsString() {
		const div = document.createElement('div');
		this.setSelfTo(div);

		return div.innerHTML;
	}

	/**
	 * Очищает корневой елемент
	 */
	clearAnchor() {
		this.anchor.innerHTML = '';
	}
}