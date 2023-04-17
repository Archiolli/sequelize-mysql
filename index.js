const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const User = require('./models/User')

//USANDO O EXPRESS
const app = express()



//Basicamente não deixar a aplicação rodar sem as tabelas necessarias
conn.sync().then(() => {// e cria oq nao está criado ainda
    app.listen(3000)
}).catch((err) => {
    console.log(err);
})






//CONFIGS DO HANDLEBARS E EXPRESS
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const handlebars = exphbs.create({ extname: '.hbs', });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.use(express.static('public'))


//ROTAS DE GET
app.get('/', async (req, res) => {

    const users = await User.findAll({ raw: true })



    res.render('home', {users: users})
})




app.get('/users/create', (req, res) => {
    res.render('adduser')
})

app.post('/users/create', async (req, res) => {

    const { name, ocupation } = req.body
    let newsletter = req.body.newsletter

    if (newsletter === 'on') {
        newsletter = true
    } else {
        newsletter = false
    }
    console.log(req.body);
    await User.create({ name, ocupation, newsletter })

    res.redirect('/')

})























//CONEXÃO COM O BANCO (UNIVERSAL PRA SQL) //conexão na unha
// const conn = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'nodemysql2',
// })
// conn.connect(function (err) {
//     if (err) {
//         console.log(err)
//     }

//     console.log('Conectado ao MySQL!')
//app.listen(3000)
//
// })

