// подключение express
const express = require("express");
const path = require('path');
// подключение бд
const db = require('./database/DB_manager');
// создаем объект приложения
const app = express();
var port = process.env.PORT || 3000;
// Прошедшая 
const yes = JSON.stringify({ result: true });
const no = JSON.stringify({ result: false });
const name_is_taken = JSON.stringify({ status: false, message: "name is taken" })
const login_is_taken = JSON.stringify({ status: false, message: "login is taken" })
const email_is_taken = JSON.stringify({ status: false, message: "email is taken" })
const acc_is_created = JSON.stringify({ status: true, message: "acc is created" });
const char_is_created = JSON.stringify({ status: true, message: "char is created" });

const good_entrance = JSON.stringify({ status: true, message: "entrance is confirm" });
const bad_entrance = JSON.stringify({ status: false, message: "login or password is incorrect" });


app.get('/char_list', (req, res) => {
    db.get_char(req.query, function (data) {
        res.send(data);
    });
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
        else {
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

app.post('/create_char_fast', (req, res) => {
    db.add_char_fast(req.query)
    res.send(char_is_created)
});

app.post('/entrance', (req, res) => {
    login_or_mail = req.query['login_or_email']
    pwd = req.query['pwd']
    filter = {}

    if (login_or_mail.indexOf('@') > -1) {
        filter.email = login_or_mail
    }
    else {
        filter.login = login_or_mail
    }
    db.get_user(filter, function (data) {
        console.log(data)
        if (data[0] !== undefined) {
            if (data[0].pwd == pwd) {
                res.send(good_entrance)
                return
            }

        }
        res.send(bad_entrance)
    });
});

// начинаем прослушивать подключения на 3000/Каком скажут порту
app.listen(port);