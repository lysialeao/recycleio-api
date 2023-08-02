const wasteModel = require('../models/wasteModel')

const getAll = async (_request, response) => {

  const waste = await wasteModel
    .getAll()
    .then()
    .catch(({ message }) => response.status(500).json({
      error: message
    }))

  return response.status(200).json({
    success: true,
    waste
  })
}

const insertWaste = async (request, response) => {
  const insertedWaste = await wasteModel
    .insertWaste(request.body)
    .then(({ insertId }) => insertId)
    .catch(({ message }) => response.status(500).json({
      success: false,
      error: message
    }))

  return response.status(200).json({
    success: true,
    insertedWaste
  }
  )
}

const insertWasteByPoint = async (request, response) => {
  const insertedWaste = await wasteModel
    .insertWasteByPoint(request.body)
    .then(({ insertId }) => insertId)
    .catch(({ message }) => response.status(500).json({
      success: false,
      error: message
    }))

  return response.status(200).json({
    success: true,
    insertedWaste
  }
  )
}

const getWasteByPoints = async (request, response) => {
  const { id } = request.params
  const wasteByCollectionPoint = await wasteModel
    .getWasteByPoint({ collection_point_id: id})
    .then()
    .catch(({ message }) => response.status(500).json({
      error: message
    }))

  return response.status(200).json({
    success: true,
    wasteByCollectionPoint
  }
  )
}

const deleteWaste = async (request, response) => {
  const { id } = request.params
  await wasteModel.deleteWaste(id)
    .then()
    .catch(({ message }) => response.status(500).json({
      error: message
    }))

  return response.status(200).json({
    success: true,
    message: 'Resíduo excluído com sucesso!'
  })
}


module.exports = {
  getAll,
  insertWaste,
  insertWasteByPoint,
  getWasteByPoints,
  deleteWaste
}
