import HeaderComponent from './Сomponents/HeaderComponent.js';
import TodoAddtemComponent from './Сomponents/TodoAddtemComponent.js';
import TodoFilterComponent from './Сomponents/TodoFilterComponent.js';
import TodoItemComponent from './Сomponents/TodoItemComponent.js';
import TodoListComponent from './Сomponents/TodoListComponent.js';
import CounterComponentFactory from './Сomponents/CounterComponentFactory.js';

export default function initCustomElements() {
	customElements.define('header-component', HeaderComponent);
	
	customElements.define('counter-all', new CounterComponentFactory('all'));
	customElements.define('counter-done', new CounterComponentFactory('done'));
	customElements.define('counter-waiting', new CounterComponentFactory('waiting'));

	customElements.define('create-item', TodoAddtemComponent);
	customElements.define('todo-item', TodoItemComponent);
	customElements.define('todo-list', TodoListComponent);
	customElements.define('todo-filter', TodoFilterComponent);
}