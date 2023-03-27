const connection = require('./connection')

const getAll = async () => {
  const [adreses] = await connection.execute('SELECT * FROM endereco')
  return adreses
}

const insertAddress = async (address) => {

  const {
    cep,
    estado,
    cidade,
    bairro,
    logradouro,
    numero
  } = address

  const query = `INSERT INTO endereco(cep, estado, cidade, bairro, logradouro, numero) VALUES(${JSON.stringify(cep)}, ${JSON.stringify(estado)}, ${JSON.stringify(cidade)}, ${JSON.stringify(bairro)}, ${JSON.stringify(logradouro)}, ${JSON.stringify(numero)})`

  const [insertedAddress] = await connection.query(query)

  return insertedAddress

}

module.exports = {
  getAll,
  insertAddress
}
