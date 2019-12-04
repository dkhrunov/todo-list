import TodoListComponent from './src/Сomponents/TodoListComponent.js';
import CreateItemComponent from './src/Сomponents/CreateItemComponent.js';
import Router from './src/Router.js';

const root = document.getElementById('root');

customElements.define('create-item', CreateItemComponent);
customElements.define('todo-list', TodoListComponent);

const router = new Router(root);

window.addEventListener('changeRoute', event => {
	router.changeRoute(event.detail.route);
});

window.dispatchEvent(new CustomEvent('changeRoute', { detail: { route: 'login' } }))