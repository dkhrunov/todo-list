import CounterComponent from './CounterComponent.js';
import Store from '../Store/Store.js';

/** 
 * Создает счетчик для всех задач
*/
class CounterAllTask extends CounterComponent {
	constructor() {
		super();
	}

	render() {
		this._templateContent = this.template.content.cloneNode(true);
		this.shadowRoot.innerHTML = '';

		let amount = Store.state.todo.length;

		this.templateContent.querySelector('span').innerText = 'Всего';
		this.templateContent.querySelector('.counter').innerText = amount;
		this.checkRelevance(amount);

		this.shadowRoot.appendChild(this.templateContent);
	}
}

/** 
 * Создает счетчик для завершенных задач
*/
class CounterDoneTask extends CounterComponent {
	constructor() {
		super();
	}

	render() {
		this._templateContent = this.template.content.cloneNode(true);
		this.shadowRoot.innerHTML = '';

		let amount = Store.state.todo.filter(item => item.completed === true).length;

		this.templateContent.querySelector('span').innerText = 'Завершенные';
		this.templateContent.querySelector('.counter').innerText = amount;
		this.checkRelevance(amount);

		this.shadowRoot.appendChild(this.templateContent);
	}
}

/** 
 * Создает счетчик для незавершенных задач
*/
class CounterWaitingTask extends CounterComponent {
	constructor() {
		super();
	}

	render() {
		this._templateContent = this.template.content.cloneNode(true);
		this.shadowRoot.innerHTML = '';

		let amount = Store.state.todo.filter(item => item.completed === false).length;

		this.templateContent.querySelector('span').innerText = 'Незавершенные';
		this.templateContent.querySelector('.counter').innerText = amount;
		this.checkRelevance(amount);

		this.shadowRoot.appendChild(this.templateContent);
	}
}

/** 
 * Класс фабрика, создает один из двух видов счетчика
*/
export default class CounterComponentFactory {
	/**
     * Вернет 1 из 3 видов счетчик
     * @param {String} type - тип счетчика
	  * @returns {CounterComponent}
     */
	constructor(type) {
		if (type === 'all') {
			return CounterAllTask;
		} 
		else if (type === 'done') {
			return CounterDoneTask;
		} 
		else if (type === 'waiting') {
			return CounterWaitingTask;
		}
	}
}

/**
 * Создает Counter по тегу описанному в customElements.define()
 * @param {String} tag 
 */
export function makeCounter(tag) {
	const counter = document.createElement(tag);
	counter.style.height = '100%';
	return counter;
}