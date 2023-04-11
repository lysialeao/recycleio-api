const connection = require('./connection')

const getAll = async () => {
  const [adreses] = await connection.execute('SELECT * FROM address')
  return adreses
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

  const [insertedAddress] = await connection.query(query)

  return insertedAddress

}

module.exports = {
  getAll,
  insertAddress
}
