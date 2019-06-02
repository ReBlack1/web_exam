// подключение express
const express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors')
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
const acc_is_created = JSON.stringify({ status: true, message: "acc was created" });
const char_is_created = JSON.stringify({ status: true, message: "char was created" });
const char_was_updated = JSON.stringify({ status: true, message: "char was updated" });

const bad_entrance = JSON.stringify({ status: false, message: "login or password is incorrect" });
app.use(cors());
// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
});

app.get('/char_list', (req, res) => {
    db.get_char(req.body, function (data) {
        res.send(data);
    });
});

app.get('/', (req, res) => {
    res.send('server is started')
});

app.post('/create_acc', (req, res) => {
    nickname = req.body.nickname
    email = req.body.email
    login = req.body.login
    pwd = req.body.pwd
    filter1 = {}
    filter1.nickname = nickname
    filter2 = {}
    filter2.login = login
    filter3 = {}
    filter3.email = email
    console.log(nickname)
    console.log(login)
    console.log(email)
    console.log(pwd)
    console.log(req.body)
    console.log(req.headers)
    console.log("........................")
    db.get_user(filter1, function (data) {
        console.log("data")
        console.log(data)
        if (data[0] !== undefined) {
            res.send(name_is_taken)
            console.log("Поиск по имени нашел значения")
        }
        else {
            db.get_user(filter2, function (data2) {
                console.log('data2')
                console.log(data2)
                if (data2[0] !== undefined) {
                    res.send(login_is_taken)
                    console.log("Поиск по логину нашел значения")
                }
                else {
                    db.get_user(filter3, function (data3) {
                        console.log('data3')
                        console.log(data3)
                        if (data3[0] !== undefined) {
                            res.send(email_is_taken)
                            console.log("Поиск по майлу нашел значения")
                        }
                        else {
                            db.add_user(nickname, email, login, pwd)
                            console.log("Аккаунт создан")
                            res.send(acc_is_created)
                        }
                    });
                }
            });
        }
    })
});

app.post('/create_char_fast', (req, res) => {
    db.add_char_fast(req.body)
    res.send(char_is_created)
});

app.post('/update_char', (req, res) => {
    const _id = req.body._id
    delete req.body._id
    console.log(req.body)
    db.update_char(_id, req.body, function () { res.send(char_was_updated) })
    
});

app.post('/entrance', (req, res) => {
    login_or_mail = req.body.login_or_email
    pwd = req.body.pwd
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
                const good_entrance = JSON.stringify({ status: true, message: "entrance is confirm", nickname:data[0].nickname });
                res.send(good_entrance)
                return
            }

        }
        res.send(bad_entrance)
    });
});

// начинаем прослушивать подключения на 3000/Каком скажут порту
app.listen(port);