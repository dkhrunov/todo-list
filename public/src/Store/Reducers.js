export default function createReducers() {
	return {
		addTodo: (payload, state) => ({
			...state,
			todo: [ ...state.todo, payload ],
		}),
		removeTodo: (payload, state) => ({
			...state,
			todo: state.todo.filter(item => item.id != payload.id),
		}),
		editTodo: (payload, state) => ({
			...state,
			todo: [ ...state.todo.filter(item => item.id != payload.id), payload ],
		}),
		changeFilter: (payload, state) => ({
			...state,
			selectedFilter: payload,
		}),
	}
}