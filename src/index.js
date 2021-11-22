const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()// carrega as variaveis de ambiente
const InicializaMongoServer = require('../config/dbfuncionarios')
const rotasFuncionarios = require('../routes/Funcionarios')

InicializaMongoServer() // mongo inicializado

app.use(express.json()) //faz parte do json
app.use(cors())
const PORT = process.env.PORT

app.get('/', (req, res) => //req = manda para o servidor / res= resposta, (req,res) => //req = manda para o servidor / res= resposta
{
    res.json({

        mensagem: "🚀 SERVIDOR CONECTADO 🚀",
        versao: "1.0.0"
    })
})

//rotas app
app.use('/funcionarios', rotasFuncionarios)

//tratamento de erro
app.use(function (req, res) {
    res.status(404).json({
        mensagem: `A rota ${req.originalUrl} nao existe`
    })
})


app.listen(PORT, (req, res) => {
    console.log(`🚀Servidor Web Rodando na Porta ${PORT}🚀`)
})