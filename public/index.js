import initCustomElements from './src/initCustomElements.js/index.js';
import Router from './src/Router/Router.js';
import Store from './src/Store/Store.js';
import ApiTodo from './src/Api/TodoApi.js';

window.Api = ApiTodo;

initCustomElements();

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