const connection = require('./connection')
const { residuoStatus } = require('../enum/residuoStatus')

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
  const query = `INSERT INTO residuo_status(id_empresa, id_residuo, status) VALUES(${JSON.stringify(id_empresa)}, ${JSON.stringify(id_residuo)}, ${JSON.stringify(residuoStatus.ativo)})`

  const [insertedResiduo] = await connection.query(query)

  return insertedResiduo
}

const getResiduosByPoint = async ({ id_empresa }) => {
  const [residuos] = await connection.execute(`SELECT * FROM residuo_status where id_empresa=${JSON.stringify(id_empresa)}`)
  return residuos
}

module.exports = {
  getAll,
  insertResiduo,
  insertResiduoByPoint,
  getResiduosByPoint
}