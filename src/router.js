const express = require('express')

const pointsController = require('./controllers/collectionPointsController')
const addressController = require('./controllers/addressController')
const residueController = require('./controllers/residueController')
const userController = require('./controllers/userController')
const collectionController = require('./controllers/collectionController')

const router = express.Router()


router.get('/points/cep', pointsController.getPointsByCEP)
router.get('/points', pointsController.getAll)
router.post('/points', pointsController.insertPoint)

router.get('/address', addressController.getAll)
router.post('/address', addressController.insertAddress)

router.get('/residuo', residueController.getAll)
router.post('/residuo', residueController.insertResiduo)
router.post('/residuo/empresa', residueController.insertResiduoByPoint)
router.get('/residuo/empresa', residueController.getResiduosByPoint)
router.delete('/residuo/:id', residueController.deleteResidue)

router.get('/user', userController.getAll)
router.post('/user', userController.insertUser)
router.delete('/user/:id', userController.deleteUser)

router.get('/collection', collectionController.getAll)
router.post('/collection', collectionController.insertCollection)


module.exports = router