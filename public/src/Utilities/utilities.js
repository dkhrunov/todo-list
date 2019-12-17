/**
 * Генерация рандомного числа
 * @returns {StringNumber}
 */
export const generateRandomNum = () => String(Math.round(Date.now() * Math.random()));

/**
 * Приводит дату к типу "dd.mm.yy"
 * @param {String} dateStr
 * @returns {String}
 */
export const formatDate = (dateStr) => {

	let date  = new Date(dateStr);

	var dd = date.getDate();
	if (dd < 10) dd = '0' + dd;
 
	var mm = date.getMonth() + 1;
	if (mm < 10) mm = '0' + mm;
 
	var yy = date.getFullYear() % 100;
	if (yy < 10) yy = '0' + yy;

	var yyyy = date.getFullYear();
 
	return mm + '/' + dd + '/' + yyyy;
}

/**
 * Сортирует список дел по дате (от новых к старым)
 * и возвращает отсортированный массив
 * @param {Array} todo
 * @returns {Array}
 */
export const sortTodoByDate = (todo) => {
	if (!todo) { return; }

	return todo.sort((curr, next) => new Date(next.createDate) - new Date(curr.createDate));
}

/**
 * Преобразует строковое белевого значение к Boolean
 * @param {String} string
 * @returns {Boolean}
 */
export const parseStringToBoolean = (string) => {
	if (string === 'true') { return true; } 

	if (string === 'false') { return false; }

	return
}