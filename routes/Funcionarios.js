const express = require('express')
const router = express.Router()
const Funcionarios = require('../model/Funcionarios')
const { check, validationResult } = require('express-validator')


//valida o POST
const validaFuncionarios = [
    check("nome", 'O campo Nome é obrigatorio').not().isEmpty(),
    check('status', 'Informe o status do Funcionario').isIn(['proprio', 'terceirizado'])
]

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

//GET/FUNCIONARIOS por ID
// lista funcionarios por ID//

router.get('/:id', async (req, res) => {
    try {

        const funcionario = await Funcionarios.findById(req.params.id)
        res.json(funcionario)

    } catch (err) {
        res.status(500).send({
            errors: [{ message: `Nao foi possivel obter o Funcionario por ID ${req.params.id}` }]
        })
    }
})


//##################################################//##################################################

//POST = INCLUI NOVO FUNCIONARIO
router.post('/', validaFuncionarios,
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(({
                errors: errors.array()

            }))
        }

        try {

            let funcionarios = new Funcionarios(req.body)
            await funcionarios.save()
            res.send(funcionarios)
        } catch (err) {
            return res.status(500).json(
                {
                    errors: [{ message: `Erro ao salvar Funcioario: ${err.message}` }]
                })
        }

    })

//##################################################//##################################################
//PUT = Altera os dados do funcionario


router.put('/', validaFuncionarios,
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(({
                errors: errors.array()

            }))
        }

        try {
            let dados = req.body
            await Funcionarios.findByIdAndUpdate(req.body._id, { $set: dados }, { new: true })
                .then(funcionario => {
                    res.send({ message: `Dados do funcionario ${funcionario.nome} alterado com sucesso` })
                })
                .catch(err => {
                    return res.status(500).send({ message: `Erro ao alterar os dados do id ${req.body._id}` })
                })


        } catch (err) {
            return res.status(500).json(
                {
                    errors: [{ message: `Erro ao Alterar: ${err.message}` }]
                })
        }

    })
    //##################################################//##################################################
    
    //DELETE = remove os dados do funcionario

router.delete('/:id', async (req, res) => {
    await Funcionarios.findByIdAndRemove(req.params.id)
        .then(funcionario => {
            res.send({ message: `Funcionario ${funcionario.nome} removido com sucesso !!!` })
        }).catch(err => {
            return res.status(400).send({
                errors: [{ message: `Nao foi possivel remover o funcionario com id ${req.params.id}` }]
            })
        })
})

module.exports = router