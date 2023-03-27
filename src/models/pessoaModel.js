const connection = require('./connection')

const addressModel = require('./addressModel')

const getAll = async () => {
  const [pessoas] = await connection.execute('SELECT * FROM pessoa')
  return pessoas
}

const insertPessoa = async (pessoa) => {

  const { address } = pessoa

  const insertedAddress = await addressModel.insertAddress(address)
    .then(({ insertId }) => { return insertId })

  const {
    cpf,
    nome,
    sobrenome,
    senha
  } = pessoa

  const query = `INSERT INTO
    pessoa(cpf, nome, sobrenome, senha, id_endereco)
    VALUES(${JSON.stringify(cpf)}, ${JSON.stringify(nome)}, ${JSON.stringify(sobrenome)}, ${JSON.stringify(senha)}, ${JSON.stringify(insertedAddress)}) `

  const [insertedPessoa] = await connection.query(query)

  return insertedPessoa

}

module.exports = {
  getAll,
  insertPessoa
}