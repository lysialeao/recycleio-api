const connection = require('./connection')

const getAll = async () => {
  const [coletas] = await connection.execute('SELECT * FROM coleta')
  return coletas
}

const insertColeta = async = (pessoa) => {

}

module.exports = {
  getAll,
  insertColeta
}