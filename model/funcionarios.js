const mongoose = require('mongoose')

const FuncionariosSchema = mongoose.Schema({
    nome: { type: String },
    status: { type: String, enum: ['proprio', 'terceirizado'], default: 'proprio' },
    idade: { type: Number },
    cargo: { type: String },
    salario: { type: Number }
}, { timestamps: true })

module.exports = mongoose.model('Funcionarios', FuncionariosSchema)