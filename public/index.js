import TodoListComponent from './src/Сomponents/TodoListComponent.js';
import CreateItemComponent from './src/Сomponents/CreateItemComponent.js';
import TodoFilterComponent from './src/Сomponents/TodoFilterComponent.js';
import Router from './src/Router.js';


customElements.define('create-item', CreateItemComponent);
customElements.define('todo-list', TodoListComponent);
customElements.define('todo-filter', TodoFilterComponent);

const root = document.getElementById('root');

const router = new Router(root);

window.addEventListener('changeRoute', event => {
	router.changeRoute(event.detail.route);
});

if ( !router.isAuthorization() ) {
	window.dispatchEvent(new CustomEvent('changeRoute', { detail: { route: 'login' } }));
} else {
	window.dispatchEvent(new CustomEvent('changeRoute', { detail: { route: 'todolist' } }));
}