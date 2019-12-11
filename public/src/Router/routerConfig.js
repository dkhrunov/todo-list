import TodoListPageComponent from '../Pages/TodoListPageComponent.js';
import LoginPageComponent from '../Pages/LoginPageComponent.js';

const routerConfig = {
	'login': {
		data: { route: 'login' },
		url: 'login',
		component: LoginPageComponent,
	},
	'todolist': {
		data: { route: 'todolist' },
		url: 'todolist',
		component: TodoListPageComponent,
	}
}

export default routerConfig;