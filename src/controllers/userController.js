const userModel = require('../models/userModel')

const getAll = async (_request, response) => {

  const users = await userModel
    .getAll()
    .then()
    .catch(({ message }) => response.status(500).json({
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
    .then()
    .catch(({ message }) => response.status(500).json({
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
    .then()
    .catch(({ message }) => response.status(500).json({
      error: message
    }))

  return response.status(200).json({
    success: true,
    message: 'User deleted successfully'
  })
}

module.exports = {
  getAll,
  insertUser,
  deleteUser
}