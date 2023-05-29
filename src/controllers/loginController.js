
const { cryptoFunction } = require('../helpers/crypto')
const { getUser } = require('../models/userModel')
const { getCollectionPoint } = require('../models/collectionPointsModel')

const getUserIdentify = async (request, response) => {

  const { login, password, type } = request.body

  const cipherpwd = cryptoFunction(password)

  if ( type === 'cpf') {

    const user = await getUser({ login, password: cipherpwd})
      .then((user) => {
        if(user.length < 0) {
          return response.status(500).json({
            error: 'Login ou senha incorretos'
          })
        }else {
          return user
        }

      })
      .catch(({ message }) => response.status(500).json({
        error: message
      }))

      return response.status(200).json({
        success: true,
        user
      })
  }

  if( type === 'cnpj') {
    const user = await getCollectionPoint({ login, password: cipherpwd})
      .then((user) => {
        if(user.length < 1) {
          return response.status(500).json({
            error: 'Login ou senha incorretos'
          })
        }else {
          return user
        }
      })
      .catch(({ message }) => response.status(500).json({
        error: message
      }))

      return response.status(200).json({
        success: true,
        user
      })
  }

  return response.status(401).json({
    error: 'Login ou senha incorretos'
  })
}

module.exports = {
  getUserIdentify
}