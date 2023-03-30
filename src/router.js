const express = require('express')

const pointsController = require('./controllers/pointsController')
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

router.get('/pessoa', userController.getAll)
router.post('/pessoa', userController.insertPessoa)

router.get('/coleta', collectionController.getAll)
router.post('/coleta', collectionController.insertCollection)


module.exports = router