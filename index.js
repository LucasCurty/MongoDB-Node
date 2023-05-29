require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require('mongoose')
const PORT = process.env.PORT_SERV;


app.listen(PORT, ()=> console.log(`server running`));

mongoose.connect(process.env.MONGO_URL)
    .catch(error => console.log(error))
    .finally(console.log("Bando de dados Conectado!"))

//Schema - Classificando os tipos de dados.
const typeSchema = new mongoose.Schema({
    id: Number,
    user: String,
    age: Number,
    create: Number
})
//Definindo o banco de dados qual o modelo apontando o Schema acima
const NewUser = mongoose.model('user', typeSchema)

//Criando os dados conforme o modelo
const user = new NewUser({
    id: Math.floor(Math.random()*100),
    user: "João",
    age: 12,
    create: Date.now('year', 'mounth', 'days')
})

//Enviando os dados 
const saveUser = (data) =>{
    data.save()
    .then(console.log('Confirmado'))
    .catch(error => console.log(error))
}

//adicionando usuario
saveUser(user)
// console.log(user.user)


// ------------------ rotas para interação com o front -----
app.post('/user', (req,res) => {})

app.get('/:user', (req,res) => {

    let name = req.params.user;
    
    NewUser.find({name})
        .then(element => console.log(element))
        .catch(error => console.log(error))

    })