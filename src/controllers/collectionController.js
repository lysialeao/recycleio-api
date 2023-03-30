const collectionModel = require('../models/collectionModel')

const getAll = async (_request, response) => {

  const coletas = await collectionModel
    .getAll()
    .then((data) => data)
    .catch(({ message }) => response.status(500).json({
      success: false,
      error: message
    }))

  return response.status(200).json({
    success: true,
    coletas
  })
}

const insertCollection = async (_request, response) => {
  const newCollectionInserted = await collectionModel
    .insertCollection(request.body)
    .then(data => data )
    .catch(({ message }) => response.status(500).json({
      success: false,
      error: message
    }))

  return response.status(200).json({
    success: true,
    newCollectionInserted
  })

}

module.exports = {
  getAll,
  insertCollection
}