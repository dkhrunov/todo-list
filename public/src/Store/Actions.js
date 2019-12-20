export const TODO_COMMANDS = {
	ADD: 'ADD_TODO',
	EDIT: 'EDIT_TODO',
	DELETE: 'DELETE_TODO',
};

export const FILTER_COMMANDS = {
	CHANGE: 'CHANGE_FILTER',
}


export function addTodo(payload) {
	return { type: TODO_COMMANDS.ADD, payload };
}

export function editTodo(payload) {
	return { type: TODO_COMMANDS.EDIT, payload };
}

export function deleteTodo(payload) {
	return { type: TODO_COMMANDS.DELETE, payload };
}

export function changeFilter(payload) {
	return { type: FILTER_COMMANDS.CHANGE, payload };
}
