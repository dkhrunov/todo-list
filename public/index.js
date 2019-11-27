import HeaderComponent from './src/components/HeaderComponent.js';
import TodoListComponent from './src/components/TodoListComponent.js';
import FooterComponent from './src/components/FooterComponent.js';

const root = document.getElementById('root');

const headerComponent = new HeaderComponent(root.querySelector('.header'), { text: 'Todo App' });
const todoList = new TodoListComponent(root.querySelector('.content'), { items: ['Microsoft', 'Google', 'Apple', 'IBM'] });
const footer = new FooterComponent(root.querySelector('.footer'), { text: 'created by Denis Khrunov' });

// setTimeout(() => {
// 	todoList.props = { items: ['1', '2', '3', '4'] };
// }, 2000);