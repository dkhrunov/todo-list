import HeaderComponent from './src/components/HeaderComponent.js';
import TodoListComponent from './src/components/TodoListComponent.js';

const root = document.getElementById('root');

const header = new HeaderComponent(root.querySelector('.header'), { appName: 'Todo App' });

customElements.define('todo-list', TodoListComponent);
const TodoList = document.createElement('todo-list');
root.querySelector('#todo-list').appendChild(TodoList);