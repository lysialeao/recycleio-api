const connection = require('./connection')

const addressModel = require('./addressModel')

const getAll = async () => {
  const [points] = await connection.execute('SELECT * FROM collection_points')
  return points
}

const insertPoint = async (point) => {

  const { address } = point

  const insertedAddress = await addressModel.insertAddress(address)
    .then(({ insertId }) => { return insertId })

  const {
    cnpj,
    razao_social,
    nome_fantasia,
    telefone,
    email,
    dias_coleta,
    nome_responsavel_coletas,
    email_responsavel_coletas,
  } = point

  const cnpjInt = parseInt(cnpj)

  const query = `INSERT INTO
    pontos_coleta(cnpj,razao_social,nome_fantasia,telefone, email, dias_coleta, nome_responsavel_coletas, email_responsavel_coletas, id_endereco)
    VALUES(${JSON.stringify(cnpjInt)}, ${JSON.stringify(razao_social)}, ${JSON.stringify(nome_fantasia)}, ${JSON.stringify(telefone)}, ${JSON.stringify(email)}, ${JSON.stringify(dias_coleta)}, ${JSON.stringify(nome_responsavel_coletas)}, ${JSON.stringify(email_responsavel_coletas)}, ${JSON.stringify(insertedAddress)}) `

  const [insertedPoint] = await connection.query(query)

  return insertedPoint

}

const getPointsByCEP = async (cep) => {
  const [adresses] = await connection.execute(`SELECT * FROM endereco where cep=${JSON.stringify(cep)}`)

  const idAdreses = await adresses.map((address) => { return JSON.stringify(address.id)})

  const [points] = await connection.execute('SELECT * FROM pontos_coleta where id_endereco in (' + idAdreses.join() + ')')

  return points
}

module.exports = {
  getAll,
  insertPoint,
  getPointsByCEP
}