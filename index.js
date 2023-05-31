require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require('mongoose')
const PORT = process.env.PORT_SERV;


app.listen(PORT, ()=> console.log(`server running`));

//Conecção com o banco de dados
mongoose.connect(process.env.MONGO_URL)
    .catch(error => console.log(error))
    .finally(console.log("Bando de dados Conectado!"))

//Schema - Definindo os tipos e dados.
const typeSchema = new mongoose.Schema({
    id: Number,
    user: String,
    age: Number,
    create: String
})
//Definindo o banco de dados qual o modelo apontando o Schema acima
const NewUser = mongoose.model('user', typeSchema)

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
    user: "Lucas",
    age: 22,
    create: data()
})

//Enviando os dados 
const saveUser = (data) =>{
    data.save()
    .then(console.log('Confirmado'))
    .catch(error => console.log(error))
}

//adicionando usuario
//saveUser(user)


// ------------------ rotas para interação com o front -----

app.get('/:find', (req,res) => {

    let name = req.params.find;
    
    NewUser.findOne({user:name})
        .then(item => {
            res.status(200).send(`Aqui estao seus dados: ${item.id} ${item.age} ${item.user}`)
            console.log(item)
        })
        .catch(error => console.log(error))
    })