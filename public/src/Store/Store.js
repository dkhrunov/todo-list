import Observer from "./Observer.js";
import createRedusers from "./Reducers.js";
import { sortTodoByDate } from "../Utilities/utilities.js";

class Store {
	constructor(reducers) {
		this.reducers = reducers;
		this.state = {
			todo: [],
			selectedFilter: 'all',
		}
		this.events = new Observer();
	}

	dispatch(actionType, payload) {
		if (this.reducers[actionType]) {
			this.state = this.reducers[actionType](payload, this.state);
			sortTodoByDate(this.state.todo);
			this.events.notify('change', this.state);
		}
	}
}

export default new Store(createRedusers());