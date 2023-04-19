const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const User = require('./models/User')
const Address = require('./models/Adress')

//USANDO O EXPRESS
const app = express()



//Basicamente não deixar a aplicação rodar sem as tabelas necessarias
conn.sync().then(() => {// e cria oq nao está criado ainda { force: true } se quiser recriar uma tabela (criar relacionamentos)
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
    res.render('home', { users: users })
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

//pegando alguma coisa específica 
app.get('/users/:id', async (req, res) => {
    const { id } = req.params

    const user = await User.findOne({ raw: true, where: { id: id } })

    res.render('userview', { user })
})


app.post('/users/delete/:id', async (req, res) => {

    const { id } = req.params

    await User.destroy({ where: { id: id } })

    res.redirect('/')

})

app.get('/users/edit/:id', async (req, res) => {
    const id = req.params.id

    try {
        const user = await User.findOne({ include: Address, where: { id: id } })

        res.render('useredit', { user: user.get({ plain: true }) })
    } catch (error) {
        console.log(error);
    }


})


app.post('/users/update', function (req, res) {
    const id = req.body.id
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if (newsletter === 'on') {
        newsletter = true
    } else {
        newsletter = false
    }

    const userData = {
        id,
        name,
        occupation,
        newsletter,
    }

    console.log(req.body)
    console.log(userData)

    User.update(userData, {
        where: {
            id: id,
        },
    })
        .then((user) => {
            console.log(user)
            res.redirect('/')
        })
        .catch((err) => console.log(err))
})

//criando endereço

app.post('/address/create', async (req, res) => {

    const { UserId, street, number, complement, city } = req.body

    const address = {
        UserId,
        street,
        number,
        complement,
        city
    }
    await Address.create(address)

    res.redirect(`/users/edit/{{UserId}}`)
})











//remoção
app.post('/address/delete', async (req, res) => {
    const { id, UserId } = req.body

    await Address.destroy({ where: { id: id } })
    res.redirect(`/users/edit/{{UserId}}`)
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

