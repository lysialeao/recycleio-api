const collectionPointsModel = require('../models/collectionPointsModel')

const getAll = async (_request, response) => {

  const collectionPoints = await collectionPointsModel
    .getAll()
    .then()
    .catch(({ message }) => response.status(500).json({
      error: message
    }))

  return response.status(200).json({
    success: true,
    collectionPoints
  })
}

const insertcollectionPoint = async (request, response) => {
  const insertedcollectionPoint = await collectionPointsModel
    .insertcollectionPoint(request.body)
    .then()
    .catch(({ message }) => response.status(500).json({
      error: message
    }))

  return response.status(200).json({
    success: true,
    insertedcollectionPoint
  })
}

const getcollectionPointsByCEP = async (request, response) => {
  const collectionPoints = await collectionPointsModel
    .getcollectionPointsByCEP(request.params)
    .then((data) => data)
    .catch(({ message }) => response.status(500).json({
      success: false,
      error: message
    }))

  return response.status(200).json({
    success: true,
    collectionPoints
  })
}

module.exports = {
  getcollectionPointsByCEP,
  getAll,
  insertcollectionPoint
}
