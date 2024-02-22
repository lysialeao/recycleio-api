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
    .insertCollectionPoint(request.body)
    .then()
    .catch(({ message }) => response.status(500).json({
      error: message
    }))

  return response.status(200).json({
    success: true,
    insertedcollectionPoint
  })
}

const getCollectionPointByWastes = async (request, response) => {
  const { wastes } = request.body
  const collectionPoints = await collectionPointsModel
    .getCollectionPointByWastes({ wastes })
    .then()
    .catch(({ message }) => response.status(500).json({
      error: message
    }))

  return response.status(200).json({
    success: true,
    collectionPoints
  })
}

const deleteCollectionPoint = async (request, response) => {
  const { cnpj } = request.params
  await collectionPointsModel.deleteCollectionPoint(cnpj)
    .then()
    .catch(({ message }) => response.status(500).json({
      error: message
    }))

  return response.status(200).json({
    success: true,
    message: 'Ponto de coleta excluído com sucesso!'
  })
}

const getCollectionPoint = async (request, response) => {
  const { cnpj } = request.params
  const collectionPoint = await collectionPointsModel
    .getCollectionPointByCnpj(cnpj)
    .then()
    .catch(({ message }) => response.status(500).json({
      error: message
    }))

  return response.status(200).json({
    success: true,
    collectionPoint
  })
}

module.exports = {
  getCollectionPointByWastes,
  getAll,
  insertcollectionPoint,
  deleteCollectionPoint,
  getCollectionPoint
}
