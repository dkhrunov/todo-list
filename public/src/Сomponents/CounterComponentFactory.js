import CounterComponent from './CounterComponent.js';
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
			width: 175px;
    		margin-right: 40px;
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

/** 
 * Создает счетчик для всех задач
*/
class CounterAllTask extends CounterComponent {
	constructor() {
		super();
	}

	render() {
		this._template = template.content.cloneNode(true);
		this.shadowRoot.innerHTML = '';

		let amount = Store.state.todo.length;

		this.template.querySelector('span').innerText = 'Всего';
		this.template.querySelector('.counter').innerText = amount;
		this.checkRelevance(amount);

		this.shadowRoot.appendChild(this.template);
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
		this._template = template.content.cloneNode(true);
		this.shadowRoot.innerHTML = '';

		let amount = Store.state.todo.filter(item => item.completed === true).length;

		this.template.querySelector('span').innerText = 'Завершенные';
		this.template.querySelector('.counter').innerText = amount;
		this.checkRelevance(amount);

		this.shadowRoot.appendChild(this.template);
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
		this._template = template.content.cloneNode(true);
		this.shadowRoot.innerHTML = '';

		let amount = Store.state.todo.filter(item => item.completed === false).length;

		this.template.querySelector('span').innerText = 'Незавершенные';
		this.template.querySelector('.counter').innerText = amount;
		this.checkRelevance(amount);

		this.shadowRoot.appendChild(this.template);
	}
}

/** 
 * Класс фабрика, создает один из двух видов счетчика
*/
export default class CounterComponentFactory {
	/**
     * Вернет 1 из 2 видов счетчик
     * @param {String} type - тип счетчика
	  * @returns {CounterDoneTask} или @returns {CounterWaitingTask} - взавизимости от @param {String} type
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