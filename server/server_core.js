// подключение express
const express = require("express");
const path = require('path');
// подключение бд
const db = require('./database/DB_manager');
// создаем объект приложения
const app = express();
// Прошедшая 
const yes = JSON.stringify({ result: true });
const no = {
    result: false
};
const name_is_taken = JSON.stringify({ result: "name is taken" })
const login_is_taken = JSON.stringify({ result: "login is taken" })
const email_is_taken = JSON.stringify({ result: "email is taken" })
const acc_is_created = JSON.stringify({ result: "acc is created" });


app.get('/methods/characterSheet', (req, res) => {
    res.send(JSON.stringify(yes))
});
app.get('/', (req, res) => {
    res.send('server is started')
});

app.post('/create_acc', (req, res) => {
    nickname = req.query['nickname']
    email = req.query['email']
    login = req.query['login']
    pwd = req.query['pwd']
    filter1 = {}
    filter1.nickname = nickname
    filter2 = {}
    filter2.login = login
    filter3 = {}
    filter3.email = email
    db.get_user(filter1, function (data) {
        if (data[0] !== undefined) {
            res.send(name_is_taken)
            console.log("Поиск по имени нашел значения")
        }
        else
        {
            db.get_user(filter2, function (data2) {
                if (data2[0] !== undefined) {
                    res.send(login_is_taken)
                    console.log("Поиск по логину нашел значения")
                }
                else {
                    db.get_user(filter3, function (data3) {
                        if (data3[0] !== undefined) {
                            res.send(email_is_taken)
                            console.log("Поиск по майлу нашел значения")
                        }
                        else {
                            db.add_user(nickname, email, login, pwd)
                            res.send(yes)
                        }
                    });
                }
            });
        }
    })    
});

app.post('/create_char', (req, res) => {
    res.send('create_char')
});

app.post('/entrance', (req, res) => {
    res.send('entrance')
});

// начинаем прослушивать подключения на 80 порту
app.listen(443);