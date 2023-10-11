const express = require('express')

const pointsController = require('./controllers/collectionPointsController')
const addressController = require('./controllers/addressController')
const wasteController = require('./controllers/wasteController')
const userController = require('./controllers/userController')
const collectionController = require('./controllers/collectionController')
const loginController = require('./controllers/loginController')
const reportsController = require('./controllers/reportsController')

const router = express.Router()

// router.get('/points/:zip_code', pointsController.getCollectionPointByZipCode)
router.get('/points', pointsController.getAll)
router.get('/points/:cnpj', pointsController.getCollectionPoint)
router.post('/points', pointsController.insertcollectionPoint)
router.delete('/points/:cnpj', pointsController.deleteCollectionPoint)

router.get('/address', addressController.getAll)
router.post('/address', addressController.insertAddress)
router.get('/address/:id', addressController.getAddresById)

router.get('/waste', wasteController.getAll)
router.post('/waste', wasteController.insertWaste)
router.post('/waste/point', wasteController.insertWasteByPoint)
router.get('/waste/point/:id', wasteController.getWasteByPoints)
router.delete('/waste/:id', wasteController.deleteWaste)

router.get('/user', userController.getAll)
router.post('/user', userController.insertUser)
router.delete('/user/:id', userController.deleteUser)

router.get('/collection', collectionController.getAll)
router.post('/collection', collectionController.insertCollection)
router.get('/collection/point/:id', collectionController.getCollectionsByPoint)
router.patch('/collection/:id', collectionController.updateCollection)
router.get('/collection/user/:id', collectionController.getCollectionsByCpf)

router.get('/reports/all/:id', reportsController.getAllCollections)
router.post('/reports/interval/:id/', reportsController.getCollectionsByInterval)
router.get('/reports/user/all/:id', reportsController.getAllCollectionsUser)
router.post('/reports/user/interval/:id/', reportsController.getCollectionsByIntervalUser)

router.post('/login', loginController.getUserIdentify)
router.post('/checkemail', loginController.checkEmailExists)


module.exports = router