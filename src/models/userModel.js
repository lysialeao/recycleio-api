const connection = require('./connection')

const addressModel = require('./addressModel')

const getAll = async () => {
  const [users] = await connection.execute('SELECT * FROM pessoa')
  return users
}

const insertUser = async (user) => {

  const { address } = user

  const insertedAddress = await addressModel.insertAddress(address)
    .then(({ insertId }) => { return insertId })

  const {
    cpf,
    nome,
    sobrenome,
    senha
  } = user

  const query = `INSERT INTO
    pessoa(cpf, nome, sobrenome, senha, id_endereco)
    VALUES(${JSON.stringify(cpf)}, ${JSON.stringify(nome)}, ${JSON.stringify(sobrenome)}, ${JSON.stringify(senha)}, ${JSON.stringify(insertedAddress)}) `

  const [insertedUser] = await connection.query(query)

  return insertedUser

}

module.exports = {
  getAll,
  insertUser
}