const coletaModel = require('../models/coletaModel')

const getAll = async (_request, response) => {

  const coletas = await pessoaModel
    .getAll()
    .then((data) => data)
    .catch(({ message }) => response.status(200).json({
      success: false,
      message
    }))

  return response.status(200).json({
    success: true,
    coletas
  })
}

module.exports = {
  getAll
}