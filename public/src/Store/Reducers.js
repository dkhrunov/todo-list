export default function createReducers() {
	return {
		setTodos: (payload, state) => ({
			...state,
			todo: [ ...payload ],
		}),
		addTodo: (payload, state) => ({
			...state,
			todo: [ payload, ...state.todo ],
		}),
		removeTodo: (payload, state) => ({
			...state,
			todo: state.todo.filter(item => item._id != payload._id),
		}),
		editTodo: (payload, state) => ({
			...state,
			todo: [ ...state.todo.filter(item => item._id != payload._id), payload ],
		}),
		changeFilter: (payload, state) => ({
			...state,
			selectedFilter: payload,
		}),
	}
}