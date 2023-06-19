const connection = require('./connection')

const getAll = async () => {
  const [addreses] = await connection.execute('SELECT * FROM address')
  return addreses
}

const getAddresById = async (id) => {
  const [address] = await connection.execute(`SELECT * FROM address WHERE id = ${id}`)
  return address
}

const insertAddress = async (address) => {

  const {
    zip_code,
    state,
    city,
    neighborhood,
    street,
    number
  } = address

  const query = `INSERT INTO address (zip_code, state, city, neighborhood, street, number) VALUES (?, ?, ?, ?, ?, ?)
  `

  const [insertedAddress] = await connection.query(query, [zip_code, state, city, neighborhood, street, number])

  return insertedAddress

}

module.exports = {
  getAll,
  insertAddress,
  getAddresById
}
