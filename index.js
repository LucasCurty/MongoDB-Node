require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require('mongoose')

app.listen(process.env.PORT_SERV, ()=> console.log('server running'));

mongoose.connect(process.env.MONGO_URL)
    .catch(error => console.log(error))
    .finally(console.log("Bando de dados Conectado!"))

//Schema - Classificando os tipos de dados.
const typeSchema = new mongoose.Schema({
    id: Number,
    user: String,
    age: Number,
    isHuman: Boolean
})
//Definindo o banco de dados qual o modelo apontando o Schema acima
const NewUser = mongoose.model('user', typeSchema)

//Criando os dados conforme o modelo
const user = new NewUser({
    id: Math.random()*10,
    user: "Junho",
    age: 10,
    isHuman: false
})

//Enviando os dados 
const saveUser = (data) =>{
    data.save()
    .then(console.log('Confirmado'))
    .catch(error => console.log(error))
}