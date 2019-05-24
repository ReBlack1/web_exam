// Подключение БД
var mongoose = require('mongoose');
var DB_config = require('./DB_config');
const login = DB_config.get_login();
const pwd = DB_config.get_pwd();
const conn = 'mongodb+srv://' + login + ':' + pwd + '@cluster0-tvj47.mongodb.net/test?retryWrites=true'

mongoose.connect(conn);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("OK!");
});

const User = mongoose.model('User', {
    nickname: String,
    email: String,
    login: String,
    pwd: String
});

const user1 = new User({nickname: 'test_nick', email:'test2@mail.ru', login:'test_2login', pwd:"test2_pwd"});
user1.save().then(() => console.log('meow'));