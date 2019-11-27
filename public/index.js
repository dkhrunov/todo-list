import HeaderComponent from './src/components/HeaderComponent.js';
import TodoListComponent from './src/components/TodoListComponent.js';
import FooterComponent from './src/components/FooterComponent.js';

const root = document.getElementById('root');

const data = {
	items: [
		{text: 'Microsoft', data: 'Today', done: false},
		{text: 'Google', data: '20.11.2019', done: false},
		{text: 'Apple', data: '01.10.2019', done: true},
		{text: 'IBM', data: '31.08.2019', done: false},
	]
}

const headerComponent = new HeaderComponent(root.querySelector('.header'), { text: 'Todo App' });
const todoList = new TodoListComponent(root.querySelector('.content'), data);
const footer = new FooterComponent(root.querySelector('.footer'), { text: 'created by Denis Khrunov' });

// setTimeout(() => {
// 	todoList.props = { items: ['1', '2', '3', '4'] };
// }, 2000);