// Подключение БД
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DB_config = require('./DB_config');
const login = DB_config.get_login();
const pwd = DB_config.get_pwd();
const conn = 'mongodb+srv://' + login + ':' + pwd + '@cluster0-tvj47.mongodb.net/test?retryWrites=true'

mongoose.connect(conn, { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("OK!");
});
const UserSchema = new Schema({
    nickname: String,
    email: String,
    login: String,
    pwd: String
})

/* Наверно можно заменить 
  {
        proficiency: String,
        value: Number
  }
  на подсхему, но я не уверен, что это сработает и лень пробовать */
const CharSchema = new Schema(
    {
        img: String,
        characterName: String,
        class: String,
        level: String,
        race: String,
        playerName: String,
        masterName: String,
        background: String,
        alignment: String,
        experiencePoints: String,
        inspiration: String,
        proficiencyBonus: String,
        passiveWisdom: String,
        characterStats:
            {
                strength: String,
                dexterity: String,
                constitution: String,
                intelligence: String,
                wisdom: String,
                charisma: String
            },

        savingThrows:
            {
                strength:
                    {
                        proficiency: String,
                        value: String
                    },
                dexterity:
                    {
                        proficiency: String,
                        value: String
                    },
                intelligence:
                    {
                        proficiency: String,
                        value: String
                    },
                wisdom:
                    {
                        proficiency: String,
                        value: String
                    },
                charisma:
                    {
                        proficiency: String,
                        value: String
                    },
            },
        skills:
            {
                acrobatics: {
                    proficiency: String,
                    value: String
                },

                animalHandling: {
                    proficiency: String,
                    value: String
                },

                arcana: {
                    proficiency: String,
                    value: String
                },

                athletics: {
                    proficiency: String,
                    value: String
                },

                deception: {
                    proficiency: String,
                    value: String
                },

                history: {
                    proficiency: String,
                    value: String
                },

                insight: {
                    proficiency: String,
                    value: String
                },

                intimidation: {
                    proficiency: String,
                    value: String
                },

                investigation: {
                    proficiency: String,
                    value: String
                },

                medicine: {
                    proficiency: String,
                    value: String
                },

                nature: {
                    proficiency: String,
                    value: String
                },

                perception: {
                    proficiency: String,
                    value: String
                },

                performance: {
                    proficiency: String,
                    value: String
                },

                persuasion: {
                    proficiency: String,
                    value: String
                },

                religion: {
                    proficiency: String,
                    value: String
                },

                sleightOfHand: {
                    proficiency: String,
                    value: String
                },

                stealth: {
                    proficiency: String,
                    value: String
                },

                survival: {
                    proficiency: String,
                    value: String
                },

            },
        state: {
            armor: String,
            initiative: String,
            speed: String,


            hitPoints: {
                maximal: String,
                current: String,
                temporary: String
            },

            hitDice: {
                total: String,
                dice: String
            },

            deathSaves: {
                successes: String,
                failures: String
            }
        },


        attacksAndSpells:
            [
                {
                    name: String,
                    attackBonus: String,

                    damage: {
                        dices: String,
                        dice: String
                    }
                }
            ],

        mindset: {
            personalityTraits: String,

            ideals: String,

            bonds: String,

            weaknesses: String
        },

        featuresAndTraits: String,


        equipment: {

            coins: {
                copper: String,
                silver: String,
                electrum: String,
                gold: String,
                platinum: String
            },

            equipment: String
        },

        misc: String
    })

const User = mongoose.model('User', UserSchema, 'users');
const Char = mongoose.model("Char", CharSchema, 'chars')

module.exports = {
    add_user: function (nickname, email, login, pwd) {
        const new_user = new User({ nickname: nickname, email: email, login: login, pwd: pwd });
        new_user.save().then(() => console.log('Пользователь ' + nickname + ' создан!'));
    },

    add_char_fast: function (char_object) {
        const new_char = new Char(char_object);
        new_char.save().then(() => console.log('Пользователь ' + new_char.characterName + ' создан!'));
    },
    get_user: function (filter, callback) {
        Object.keys(filter).forEach(key => filter[key] == "" || filter[key] == null ? delete obj[key]:'');
        User.find(filter, function (err, data) {
            if (err) return console.log(err);
            return callback(data);
        })
    },
    get_char: function (filter, callback) {
        Object.keys(filter).forEach(key => filter[key] == "" || filter[key] == null ? delete obj[key] : '');
        Char.find(filter , function (err, data) {
            if (err) return console.log(err);
            return callback(data);
        })
    }

};
