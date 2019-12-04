import TodoListPageComponent from './src/Сomponents/TodoListPageComponent.js';
import LoginPageComponent from './src/Сomponents/LoginPageComponent.js';

const routerConfig = {
	'login': {
		data: {},
		route: 'login',
		component: LoginPageComponent,
	},
	'todolist': {
		data: {},
		route: 'todolist',
		component: TodoListPageComponent,
	}
}

export default routerConfig;