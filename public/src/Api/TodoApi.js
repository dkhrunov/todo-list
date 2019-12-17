// TODO обработка BAD requests
// TODO токен хранить в localStorage и брать от туда же
// TODO пример (email, password, username) => {...} вынести в один объект data
/* data MUST BE объектом типа:
	{
		text: "string",
		createDate: "string",
		completed: "boolean",
	}
	!! "createDate" при UPDATE не изменит дату !!
*/
class TodoApi {
	constructor(url) {
		this.url = url;
	}

	/**
	 * Регистрация пользователя
	 * @param {Object} data - { email: 'string', password: 'string', username: 'string' }
	 */
	register(data) {
		return fetch(this.url + '/register', {
			method: 'POST',
			body:
				JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(res => {			
			if (res.error) { 
				throw new Error(res.error);
			} else {
				return res;
			}
		});
	}

	/**
	 * Залогиниться в приложении
	 * @param {Object} data  - { email: 'string', password: 'string' }
	 */
	login(data) {
		return fetch(this.url + '/login', {
			method: 'POST',
			body:
				JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(res => {			
			if (res.error) { 
				throw new Error(res.error);
			} else {
				return res;
			}
		});
	}

	/**
	 * Проверить пользователь зашел или нет
	 */
	checkAuth() {
		return fetch(this.url + '/me', {
			method: 'GET',
			headers: {
				'Authorization': localStorage.getItem('auth_token'),
			}
		})
		.then(res => res.json())
		.then(res => {			
			if (res.error) { 
				throw new Error(res.error);
			} else {
				res.isAuthorization = true;
				return res;
			}
		});
	}

	getAllTodo() {
		return fetch(this.url + '/todos', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem('auth_token'),
			}
		})
		.then(res => res.json())
		.then(res => {			
			if (res.error) { 
				throw new Error(res.error);
			} else {
				return res;
			}
		});
	}

	getTodo(id) {
		return fetch(this.url + `/todos/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem('auth_token'),
			}
		})
		.then(res => res.json())
		.then(res => {			
			if (res.error) { 
				throw new Error(res.error);
			} else {
				return res;
			}
		});
	}

	createTodo(data) {
		return fetch(this.url + '/todos', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem('auth_token'),
			}
		})
		.then(res => res.json())
		.then(res => {			
			if (res.error) { 
				throw new Error(res.error);
			} else {
				return res;
			}
		});
	}

	updateTodo(id, data) {
		return fetch(this.url + `/todos/${id}`, {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem('auth_token'),
			}
		})
		.then(res => res.json())
		.then(res => {			
			if (res.error) { 
				throw new Error(res.error);
			} else {
				return res;
			}
		});
	}

	deleteTodo(id) {
		return fetch(this.url + `/todos/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem('auth_token'),
			}
		})
		.then(res => res.json())
		.then(res => {			
			if (res.error) { 
				throw new Error(res.error);
			} else {
				return res;
			}
		});
	}
}

export default new TodoApi('https://todo-app-back.herokuapp.com');