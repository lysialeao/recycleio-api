const collectionModel = require('../models/collectionModel')
const wasteModel = require('../models/wasteModel')

const getAllCollections = async (request, response) => {

  const { id } = request.params

  const reports = await collectionModel
    .getAllCollectionsReport({ id })
    .then()
    .catch(({ message }) => response.status(500).json({
      error: message
    }))

  const residues = await wasteModel
    .getReportsByCollections({ id })
    .then()
    .catch(({ message }) => response.status(500).json({
      error: message
    }))

  return response.status(200).json({
    success: true,
    reports,
    residues
  })
}

const getAllCollectionsUser = async (request, response) => {

  const { id } = request.params

  const reports = await collectionModel
    .getAllCollectionsReportUser({ id })
    .then()
    .catch(({ message }) => response.status(500).json({
      error: message
    }))

  const residues = await wasteModel
    .getReportsByCollectionsUser({ id })
    .then()
    .catch(({ message }) => response.status(500).json({
      error: message
    }))

  return response.status(200).json({
    success: true,
    reports,
    residues
  })
}


const getCollectionsByInterval = async (request, response) => {

  const { id } = request.params
  const { init, end } = request.body

  const reports = await collectionModel
    .getCollectionsReportInterval({ id, init, end })
    .then()
    .catch(({ message }) => response.status(500).json({
      error: message
    }))

  const residues = await wasteModel
    .getReportsByCollectionsInterval({ id, init, end })
    .then()
    .catch(({ message }) => response.status(500).json({
      error: message
    }))

  return response.status(200).json({
    success: true,
    reports,
    residues
  })
}

const getCollectionsByIntervalUser = async (request, response) => {

  const { id } = request.params
  const { init, end } = request.body

  const reports = await collectionModel
    .getCollectionsReportIntervalUser({ id, init, end })
    .then()
    .catch(({ message }) => response.status(500).json({
      error: message
    }))

  const residues = await wasteModel
    .getReportsByCollectionsIntervalUser({ id, init, end })
    .then()
    .catch(({ message }) => response.status(500).json({
      error: message
    }))

  return response.status(200).json({
    success: true,
    reports,
    residues
  })
}


module.exports = {
  getAllCollections,
  getCollectionsByInterval,
  getAllCollectionsUser,
  getCollectionsByIntervalUser
}