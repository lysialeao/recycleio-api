const pessoaModel = require('../models/pessoaModel')

const getAll = async (_request, response) => {

  const pessoas = await pessoaModel
    .getAll()
    .then((data) => data)
    .catch(({ message }) => response.status(200).json({
      success: false,
      message
    }))

  return response.status(200).json({
    success: true,
    pessoas
  })
}

const insertPessoa = async (request, response) => {
  const insertedPessoa = await pessoaModel
    .insertPessoa(request.body)
    .then((data) => data)
    .catch(({ message }) => response.status(200).json({
      success: false,
      message
    }))


  return response.status(200).json({
    success: true,
    insertedPessoa
  })
}

module.exports = {
  getAll,
  insertPessoa
}