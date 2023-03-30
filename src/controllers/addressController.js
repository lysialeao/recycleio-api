const addressModel = require('../models/addressModel')

const getAll = async (_request, response) => {

  const adreses = await addressModel
    .getAll()
    .then((data) => data)
    .catch(({ message }) => response.status(500).json({
      success: false,
      error: message
    }))

  return response.status(200).json({
    success: true,
    adreses
  })
}

const insertAddress = async (request, response) => {
  const insertedAddress = await addressModel
    .insertAddress(request.body)
    .then(({ insertId }) => insertId)
    .catch(({ message }) => response.status(500).json({
      success: false,
      error: message
    }))

  return response.status(200).json({
    success: true,
    insertedAddress
  }
  )
}

module.exports = {
  getAll,
  insertAddress
}