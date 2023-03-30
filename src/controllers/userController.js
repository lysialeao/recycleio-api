const userModel = require('../models/userModel')

const getAll = async (_request, response) => {

  const users = await userModel
    .getAll()
    .then((data) => data)
    .catch(({ message }) => response.status(500).json({
      success: false,
      error: message
    }))

  return response.status(200).json({
    success: true,
    users
  })
}

const insertUser = async (request, response) => {
  const insertedUser = await userModel
    .insertUser(request.body)
    .then((data) => data)
    .catch(({ message }) => response.status(500).json({
      success: false,
      error: message
    }))


  return response.status(200).json({
    success: true,
    insertedUser
  })
}

const deleteUser = async (request, response) => {
  const { id } = request.params
  await userModel.deleteUser(id)
    .then(data => data)
    .catch(({ message }) => response.status(500).json({
      success: false,
      error: message
    }))

  return response.status(200).json({
    success: true,
    message: 'Usuário excluído com sucesso!'
  })
}

module.exports = {
  getAll,
  insertUser,
  deleteUser
}