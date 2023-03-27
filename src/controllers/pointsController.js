const pointsModel = require('../models/pointsModel')

const getAll = async (_request, response) => {

  const points = await pointsModel
    .getAll()
    .then((data) => data)
    .catch(({ message }) => response.status(200).json({
      success: false,
      message
    }))

  return response.status(200).json({
    success: true,
    points
  })
}

const insertPoint = async (request, response) => {
  const insertedPoint = await pointsModel
    .insertPoint(request.body)
    .then((data) => data)
    .catch(({ message }) => response.status(200).json({
      success: false,
      message
    }))


  return response.status(200).json({
    success: true,
    insertedPoint
  })
}

const getPointsByCEP = async (request, response) => {
  const points = await pointsModel
    .getPointsByCEP(request.body.cep)
    .then((data) => data)
    .catch(({ message }) => response.status(200).json({
      success: false,
      message
    }))

  return response.status(200).json({
    success: true,
    points
  })
}

module.exports = {
  getPointsByCEP,
  getAll,
  insertPoint
}
