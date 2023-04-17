const connection = require('./connection')

const addressModel = require('./addressModel')

const { defaultStatus } = require('../enum/defaultStatus')
const { cryptoFunction } = require('../helpers/crypto')

const getAll = async () => {
  const [users] = await connection.execute('SELECT * FROM user')
  return users
}

const insertUser = async (user) => {

  const { address } = user

  const insertedAddress = await addressModel.insertAddress(address)
    .then(({ insertId }) => { return insertId })

  const {
    cpf,
    first_name,
    last_name,
    password
  } = user

  const cipherpwd = cryptoFunction(password)

  const query = `INSERT INTO user(cpf, first_name, last_name, password, address_id, status) VALUES(?, ?, ?, ?, ?, ?) `

  const [insertedUser] = await connection.query(query, [cpf, first_name, last_name, cipherpwd, insertedAddress, defaultStatus.active])

  return insertedUser

}

const deleteUser = async (id) => {
  const query = `UPDATE user SET status='${defaultStatus.inactive}' WHERE cpf=${id}`
  const deletedUser = await connection.query(query)
  return deletedUser
}

module.exports = {
  getAll,
  insertUser,
  deleteUser
}