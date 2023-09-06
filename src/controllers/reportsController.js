const collectionModel = require('../models/collectionModel')

const getAllCollections = async (request, response) => {

  const { id } = request.params

  const collections = await collectionModel
    .getAllCollectionsReport({ id })
    .then()
    .catch(({ message }) => response.status(500).json({
      error: message
    }))

  return response.status(200).json({
    success: true,
    collections
  })
}


module.exports = {
  getAllCollections,
}