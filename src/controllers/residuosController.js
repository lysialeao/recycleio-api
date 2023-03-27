const residuosModel = require('../models/residuosModel')

const getAll = async (_request, response) => {

  const residuos = await residuosModel
    .getAll()
    .then((data) => data)
    .catch(({ message }) => response.status(200).json({
      success: false,
      message
    }))

  return response.status(200).json({
    success: true,
    residuos
  })
}

const insertResiduo = async (request, response) => {
  const insertedResiduo = await residuosModel
    .insertResiduo(request.body)
    .then(({ insertId }) => insertId)
    .catch(({ message }) => response.status(200).json({
      success: false,
      message
    }))

  return response.status(200).json({
    success: true,
    insertedResiduo
  }
  )
}

const insertResiduoByPoint = async (request, response) => {
  const insertedResiduo = await residuosModel
    .insertResiduoByPoint (request.body)
    .then(({ insertId }) => insertId)
    .catch(({ message }) => response.status(200).json({
      success: false,
      message
    }))

  return response.status(200).json({
    success: true,
    insertedResiduo
  }
  )
}

const getResiduosByPoint = async (request, response) => {
  const residuosEmpresa = await residuosModel
    .getResiduosByPoint(request.body)
    .then((data) => data)
    .catch(({ message }) => response.status(200).json({
      success: false,
      message
    }))

  return response.status(200).json({
    success: true,
    residuosEmpresa
  }
  )
}


module.exports = {
  getAll,
  insertResiduo,
  insertResiduoByPoint,
  getResiduosByPoint
}
