const connection = require('./connection')

const { collectionStatus } = require('../enum/collectionStatus')

const getAll = async () => {
  const [collections] = await connection.execute('SELECT * FROM coleta')
  return collections
}

const insertCollection = async (collect) => {

  const {
    pessoa,
    ponto_coleta,
    id_residuo,
    data
  } = collect

  const query = `INSERT INTO coleta(pessoa, ponto_coleta, data, coleta_status, id_residuo) VALUES(${JSON.stringify(pessoa)}, ${JSON.stringify(ponto_coleta)},${JSON.stringify(data)},${collectionStatus.scheduled},${JSON.stringify(id_residuo)})`

  const [newCollection] = await connection.query(query)

  return newCollection
}

module.exports = {
  getAll,
  insertCollection
}