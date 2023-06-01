require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require('mongoose')
const PORT = process.env.PORT_SERV;


app.listen(PORT, ()=> console.log(`server running`));

//Conecção com o banco de dados
mongoose.connect(process.env.MONGO_URL)
    .catch(error => console.log(error.message))
    .finally(console.log("Bando de dados Conectado!"))

//Schema - Definindo os tipos e dados.
const typeSchema = new mongoose.Schema({
    id: Number,
    user: String,
    age: Number,
    create: String
})
//Definindo o banco de dados qual o modelo apontando o Schema acima
const NewUser = mongoose.model('users', typeSchema)

const data = () =>{
    let day = new Date().getDate();
    let month = new Date().getMonth() + 1
    let year = new Date().getFullYear();

    let fullDate = `${day}.${month}.${year}`

    return fullDate
}

//Criando os dados conforme o modelo
const new_user = new NewUser({
    id: Math.floor(Math.random()*100),
    user: "Thiago",
    age: 32,
    create: data()
})

//Enviando os dados 
const saveUser = () =>{
    new_user.save()
    .then(console.log('Confirmado'))
    .catch(error => console.log(error))
}
//adicionando usuario
//saveUser()

// ------------------ rotas para interação com o front -----
app.get('/', (req,res) => res.send('<h1>HELLO WORLD!</h1>'))
// === Rota para Listar todos
app.get('/find', (req,res) => {

    NewUser.find()
        .then(item => res.status(200).send(console.log(item)))
        .catch(error => console.log(error))
    })
// Rota para Listar um
app.get('/:findOne', (req,res) => {

    let name = req.params.findOne;
    
    NewUser.find({user:name})
        .then(item => res.status(200).send(console.log(item)))
        .catch(error => console.log(error))
    })

//Rota Para Apagar usuario
app.delete('/:id', (req,res)=>{

    let del = req.params.id;
    
    NewUser.deleteOne({id:del})
        .then(res.send(`Apagado com sucesso!`)) 
        .catch(error => console.log(error.message))
})