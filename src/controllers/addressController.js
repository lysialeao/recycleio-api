const addressModel = require('../models/addressModel')

const getAll = async (_request, response) => {

  const addresses = await addressModel
    .getAll()
    .then()
    .catch(({ message }) => response.status(500).json({
      error: message
    }))

  return response.status(200).json({
    success: true,
    addresses
  })
}

const insertAddress = async (request, response) => {
  const insertedAddress = await addressModel
    .insertAddress(request.body)
    .then(({ insertId }) => insertId)
    .catch(({ message }) => response.status(500).json({
      error: message
    }))

  return response.status(200).json({
    success: true,
    insertedAddress
  }
  )
}

const getAddresById = async (request, response) => {
  const { id } = request.params
  const address = await addressModel
    .getAddresById(id)
    .catch(({ message }) => response.status(500).json({
      error: message
    }))

  return response.status(200).json({
    success: true,
    address
  })
}



module.exports = {
  getAll,
  insertAddress,
  getAddresById
}