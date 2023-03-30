const userModel = require('../models/userModel')

const getAll = async (_request, response) => {

  const users = await userModel
    .getAll()
    .then((data) => data)
    .catch(({ message }) => response.status(200).json({
      success: false,
      message
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
    .catch(({ message }) => response.status(200).json({
      success: false,
      message
    }))


  return response.status(200).json({
    success: true,
    insertedUser
  })
}

module.exports = {
  getAll,
  insertUser
}