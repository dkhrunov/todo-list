const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

/**
 * Путь для статических файлов
 */
app.use(express.static(path.join(__dirname, '/public')));

/**
 * Отрисовка index.html при переходе на 'localhost'
 */
app.get('/', (req, res) => {
	res.sendFile('index.html');
})

/**
 * Middleware обработки ошибок
 */
app.use((error, req, res, next) => {
	console.log(error)
	res.status(500).send('Something broke!')
})

app.listen(port, (error) => {
	if (error) {
		return console.log('something bad happened', error)
	}
	console.log(`server is listening on ${port}`)
})