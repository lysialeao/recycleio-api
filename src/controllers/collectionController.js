const collectionModel = require('../models/collectionModel')

const getAll = async (_request, response) => {

  const collections = await collectionModel
    .getAll()
    .then()
    .catch(({ message }) => response.status(500).json({
      error: message
    }))

  return response.status(200).json({
    success: true,
    collections
  })
}

const insertCollection = async (request, response) => {
  const newCollectionInserted = await collectionModel
    .insertCollection(request.body)
    .then()
    .catch(({ message }) => response.status(500).json({
      error: message
    }))

  return response.status(200).json({
    success: true,
    newCollectionInserted
  })

}

const getCollectionsByPoint = async (request, response) => {
  const { id } = request.params
  const collections = await collectionModel
    .getCollections({ id })
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
  getAll,
  insertCollection,
  getCollectionsByPoint
}