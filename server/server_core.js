// подключение express
const express = require("express");
const path = require('path');
// создаем объект приложения
const app = express();
// Директория статики
const BUILD_DIRECTORY = path.resolve(__dirname, '..', 'client')
// Настройка статики
app.use(express.static(BUILD_DIRECTORY));

// определяем обработчики для маршрутов
app.get("/", function (request, response) {

        // отправляем ответ
    response.sendFile(`${BUILD_DIRECTORY}/auth.html`);

});
app.get("/login", function (request, response) {

    // отправляем ответ
    response.sendFile(`${BUILD_DIRECTORY}/log_in.html`);

});
app.get("/signup", function (request, response) {

    // отправляем ответ
    response.sendFile(`${BUILD_DIRECTORY}/sign_up.html`);

});



// начинаем прослушивать подключения на 3000 порту
app.listen(3000);