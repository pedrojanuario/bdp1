const express = require('express')

const router = express.Router()

const Funcionarios = require('../model/Funcionarios')

//GET/FUNCIONARIOS
// lista todos os funcionarios//

router.get('/', async (req, res) => {

    try {
        const funcionarios = await Funcionarios.find()
        res.json(funcionarios)
    } catch (err) {
        res.status(500).send({
            errors: [{ message: "Nao foi possivel encontrar Funcionarios" }]
        })
    }

})
//POST = INCLUI NOVO FUNCIONARIO
router.post('/', async(req,res)=> {
    try{
        
        let funcionarios = new Funcionarios (req.body)
await funcionarios.save()
res.send(funcionarios)
    }catch(err){
        return res.status(500).json()
        {
            errors: [{message: `Erro ao salvar Funcioario: ${err.message}`}]
        }
    }
})


module.exports = router