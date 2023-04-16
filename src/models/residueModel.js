const connection = require('./connection')
const { defaultStatus } = require('../enum/defaultStatus')

const getAll = async () => {
  const [residuos] = await connection.execute('SELECT * FROM residuo')
  return residuos
}

const insertResiduo = async (residuo) => {
  const { nome } = residuo

  const query = `INSERT INTO residuo(nome) VALUES(${JSON.stringify(nome)})`

  const [insertedResiduo] = await connection.query(query)

  return insertedResiduo
}

const insertResiduoByPoint = async ({ id_empresa, id_residuo }) => {
  const query = `INSERT INTO residuo_status(id_empresa, id_residuo, status) VALUES(${JSON.stringify(id_empresa)}, ${JSON.stringify(id_residuo)}, ${JSON.stringify(defaultStatus.ativo)})`

  const [insertedResiduo] = await connection.query(query)

  return insertedResiduo
}

const getResiduosByPoint = async ({ id_empresa }) => {
  const [residuos] = await connection.execute(`SELECT * FROM residuo_status where id_empresa=${JSON.stringify(id_empresa)}`)
  return residuos
}

const deleteResidue = async (id) => {
  const query = `DELETE FROM residuo WHERE id=${JSON.stringify(id)}`
  const deletedResidue = await connection.query(query)
  return deletedResidue
}

module.exports = {
  getAll,
  insertResiduo,
  insertResiduoByPoint,
  getResiduosByPoint,
  deleteResidue
}