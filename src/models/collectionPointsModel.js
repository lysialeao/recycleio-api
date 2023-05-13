const connection = require('./connection')

const addressModel = require('./addressModel')

const { defaultStatus }  = require('../enum/defaultStatus')

const { cryptoFunction } = require('../helpers/crypto')

const getAll = async () => {
  const [points] = await connection.execute('SELECT * FROM collection_points')
  return points
}

const getCollectionPoint = async ({ login, password }) => {
  const [point] = await connection.execute(`SELECT * FROM collection_points WHERE email='${login}' AND password='${password}'`)
  return point
}

const insertCollectionPoint = async (point) => {

  const { address } = point

  const insertedAddress = await addressModel.insertAddress(address)
    .then(({ insertId }) => { return insertId })

  const {
    cnpj,
    corporate_name,
    trade_name,
    telephone,
    email,
    collection_days,
    collection_responsible_name,
    collection_responsible_email,
    password
  } = point

  const cnpjInt = parseInt(cnpj)
  const cipherpwd = cryptoFunction(password)

  const query = `INSERT INTO collection_points(cnpj, corporate_name, trade_name, telephone, email, collection_days, collection_responsible_name, collection_responsible_email, address_id, status, password)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

  const [insertedPoint] = await connection.query(query, [cnpjInt, corporate_name, trade_name, telephone, email, collection_days, collection_responsible_name, collection_responsible_email, insertedAddress, defaultStatus.active, cipherpwd])

  return insertedPoint

}

const getCollectionPointByZipCode = async (zip_code) => {
  const [addresses] = await connection.execute(`SELECT * FROM address where zip_code='${zip_code}'`)

  const addresses_id = await addresses.map((address) => { return address.id})

  const [points] = await connection.execute('SELECT * FROM collection_points where address_id in (' + addresses_id.join() + ')')
  return points
}

const deleteCollectionPoint = async (cnpj) => {
  const query = `UPDATE collection_points SET status='${defaultStatus.inactive}' WHERE cnpj='${cnpj}'`
  const deletedPoint = await connection.query(query)
  return deletedPoint
}

module.exports = {
  getAll,
  insertCollectionPoint,
  getCollectionPointByZipCode,
  deleteCollectionPoint,
  getCollectionPoint
}