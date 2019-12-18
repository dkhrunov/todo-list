import HeaderComponent from './src/Сomponents/HeaderComponent.js';
import TodoListComponent from './src/Сomponents/TodoListComponent.js';
import TodoAddtemComponent from './src/Сomponents/TodoAddtemComponent.js';
import TodoFilterComponent from './src/Сomponents/TodoFilterComponent.js';
import Router from './src/Router/Router.js';
import Store from './src/Store/Store.js';
import ApiTodo from './src/Api/TodoApi.js';

window.Api = ApiTodo;

customElements.define('header-component', HeaderComponent);
customElements.define('create-item', TodoAddtemComponent);
customElements.define('todo-list', TodoListComponent);
customElements.define('todo-filter', TodoFilterComponent);

const root = document.getElementById('root');

const router = new Router(root);

window.addEventListener('changeRoute', event =>	router.changeRoute(event.detail.route));

Api.checkAuth()
	.then(res => {
		if (res.isAuthorization) {
			window.Store = Store;
			window.dispatchEvent(new CustomEvent('changeRoute', { detail: { route: 'todolist' } }));
		} else {
			window.dispatchEvent(new CustomEvent('changeRoute', { detail: { route: 'login' } }));
		}
	});