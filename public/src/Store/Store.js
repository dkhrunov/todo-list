import Observer from "./Observer.js";
import createRedusers from "./Reducers.js";
import { sortTodoByDate } from "../Utilities/utilities.js"


// TODO избавиться от постоянной сортировки по дате
class Store {
	constructor(reducers) {
		this.reducers = reducers;
		this.state = {
			todo: sortTodoByDate([
				{
					id: '0',
					text: 'Повседневная практика показывает, что начало повседневной работы.',
					date: new Date('2019-10-17T03:24:00'),
					status: 'waiting'
				},
				{
					id: '1',
					text: 'Повседневная практика показывает, что социально-экономическое развитие.',
					date: new Date('2018-09-01T03:24:00'),
					status: 'waiting'
				},
				{
					id: '2',
					text: 'Сделать тесты по всем предметам.',
					date: new Date('2019-01-10T03:24:00'),
					status: 'done'
				},
			]),
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