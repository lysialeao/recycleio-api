const connection = require('./connection')

const { collectionStatus } = require('../enum/collectionStatus')
const { defaultStatus } = require('../enum/defaultStatus')

const getAll = async () => {
  const [collections] = await connection.execute('SELECT * FROM collection')
  return collections
}

const insertCollection = async (collection) => {

  const {
    user_id,
    collection_point_id,
    waste_id,
    date_time
  } = collection

  const query = `INSERT INTO collection(user_id, collection_point_id, date_time, collection_status, waste_id, status) VALUES (?, ?, ?, ?, ?, ?)`

  const datetime = new Date(date_time)

  const [newCollection] = await connection.query(query, [
    user_id,
    collection_point_id,
    datetime,
    collectionStatus.scheduled,
    waste_id,
    defaultStatus.active
  ])

  return newCollection
}

module.exports = {
  getAll,
  insertCollection
}