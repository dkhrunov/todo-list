import SubscribersObserver from "./SubscribersObserver.js";
import todoReducers from "./Reducers.js";
import { sortTodoByDate } from "../Utilities/utilities.js";

class Store {

	_state;
	_reducers;

	constructor(reducers, initialState) {
		this._reducers = reducers;
		this._state = !!initialState ? initialState : {};
		this.subscribersObserver = new SubscribersObserver();
	}

	get state() {
		return JSON.parse(JSON.stringify(this._state));
	}

	get reducers() {
		return this._reducers;
	}

	dispatch(action) {
		this._state = this.reducers(this._state, action);
		sortTodoByDate(this._state.todo);
		this.subscribersObserver.notify('change', this._state);
	}

	subscribe(event, callback) {
		this.subscribersObserver.subscribe(event, callback);
	}
}

export default new Store(todoReducers, { todo: [], selectedFilter: "all"});