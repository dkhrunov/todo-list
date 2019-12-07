import TodoListPageComponent from './src/Сomponents/TodoListPageComponent.js';
import LoginPageComponent from './src/Сomponents/LoginPageComponent.js';

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