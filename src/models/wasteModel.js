const connection = require('./connection')
const { defaultStatus } = require('../enum/defaultStatus')

const getAll = async () => {
  const [waste] = await connection.execute('SELECT * FROM waste')
  return waste
}

const insertWaste = async (waste) => {
  const { name } = waste

  const query = `INSERT INTO waste(name, status) VALUES(?, ?)`

  const [insertedWaste] = await connection.query(query, [name, defaultStatus.active])

  return insertedWaste
}

const insertWasteByPoint = async ({ collection_point_id, waste_id }) => {
  const query = `INSERT INTO waste_status(collection_point_id, waste_id, status) VALUES(?, ?, ?)`

  const [insertedwaste] = await connection.query(query, [collection_point_id, waste_id, defaultStatus.active])

  return insertedwaste
}

const getWasteByPoint = async ({ collection_point_id }) => {
  const [waste] = await connection.execute(`
    SELECT waste_status.*, waste.name
    FROM waste_status
    JOIN waste ON waste_status.waste_id = waste.id
    WHERE collection_point_id = ${JSON.stringify(collection_point_id)}`)
  return waste
}

const deleteWaste = async (id) => {
  const query = `UPDATE waste SET status='${defaultStatus.inactive}' WHERE id=${id}`
  const deletedResidue = await connection.query(query)
  return deletedResidue
}

const getReportsByCollections = async ({ id }) => {

  const query = `
    SELECT waste.name, COUNT(collection.id) as count
    FROM collection
    JOIN waste ON collection.waste_id = waste.id
    WHERE collection_point_id = ${id}
    GROUP BY waste.name;
  `

  const [residues] = await connection.query(query)
  return residues
}

module.exports = {
  getAll,
  insertWaste,
  insertWasteByPoint,
  getWasteByPoint,
  deleteWaste,
  getReportsByCollections
}