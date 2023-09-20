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

const getCollections = async ({ id }) => {
  const query = `SELECT
    c.*,
    JSON_OBJECT(
        'user_id', u.cpf,
        'name', u.first_name
    ) AS user_info,
    w.name AS waste_name
    FROM
      collection c
    JOIN
      user u ON c.user_id = u.cpf
    JOIN
      waste w ON c.waste_id = w.id
    WHERE
      c.collection_point_id = ${id};

  `

  const [collections] = await connection.execute(query)

  return collections
}

const updateCollection = async ({ id, status, weight }) => {

  const idNumber = Number(id)

  const query = `UPDATE collection SET collection_status='${status}', weight=${weight} WHERE id=${idNumber}`

  const [updatedCollection] = await connection.execute(query)
  return updatedCollection
}

const getCollectionsByCpf = async ({ id }) => {

  const query = `SELECT
  c.*,
    w.name AS waste_name,
    cp.trade_name
  FROM
    collection c
  JOIN
    waste w ON c.waste_id = w.id
  JOIN
    collection_points cp ON c.collection_point_id = cp.cnpj
  WHERE
  c.user_id = ${id};
`

  const [collections] = await connection.execute(query)

  return collections

}

const getAllCollectionsReport = async({ id }) => {
  const query = `
    SELECT
      COUNT(*) as total_records,
      SUM(weight) as total_weight
    FROM
      collection
    WHERE
      collection_point_id = ${id}
    AND
      collection_status = "COMPLETED";
      `

  const [reports] = await connection.execute(query)

  return reports
}

const getAllCollectionsReportUser = async({ id }) => {
  const query = `
    SELECT
      COUNT(*) as total_records,
      SUM(weight) as total_weight
    FROM
      collection
    WHERE
      user_id = ${id}
    AND
      collection_status = "COMPLETED";
    `

  const [reports] = await connection.execute(query)

  return reports
}

const getCollectionsReportInterval = async ({ id, init, end }) => {
  const query = `
    SELECT
      COUNT(*) as total_records,
      SUM(weight) as total_weight
    FROM
      collection
    WHERE
      collection_point_id = ${id}
    AND
      date_time BETWEEN "${init}" and "${end}"
    AND
      collection_status = "COMPLETED";
    `

  const [reports] = await connection.execute(query)

  return reports
}

const getCollectionsReportIntervalUser = async ({ id, init, end }) => {
  const query = `
    SELECT
      COUNT(*) as total_records,
      SUM(weight) as total_weight
    FROM
      collection
    WHERE
      user_id = ${id}
    AND
      date_time BETWEEN "${init}" and "${end}"
    AND
      collection_status = "COMPLETED";
    `

  const [reports] = await connection.execute(query)

  return reports
}

module.exports = {
  getAll,
  insertCollection,
  getCollections,
  updateCollection,
  getCollectionsByCpf,
  getAllCollectionsReport,
  getCollectionsReportInterval,
  getAllCollectionsReportUser,
  getCollectionsReportIntervalUser
}