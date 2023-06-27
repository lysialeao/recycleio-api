
const { cryptoFunction } = require('../helpers/crypto')
const { getUser } = require('../models/userModel')
const { getCollectionPoint } = require('../models/collectionPointsModel')

const getUserIdentify = async (request, response) => {

  const { login, password, type } = request.body

  const cipherpwd = cryptoFunction(password)

  const validateUser = ({ user, type }) => {
    if (user.length < 1) {
      return response.status(401).json({
        error: 'Login ou senha incorretos'
      })
    } else {
      return response.status(200).json({
        success: true,
        user: {
          ...user,
          type
        }
      })
    }
  }

  if ( type === 'cpf') {

    const user = await getUser({ login, password: cipherpwd})
      .then((user) => validateUser({ user, type: 'cpf' }))
      .catch(({ message }) => response.status(500).json({
        error: message
      }))

      return user
  }

  if( type === 'cnpj') {
    const user = await getCollectionPoint({ login, password: cipherpwd})
      .then((user) => validateUser({ user, type: 'cnpj' }))
      .catch(({ message }) => response.status(500).json({
        error: message
      }))

      return user
  }

  return response.status(401).json({
    error: 'Login ou senha incorretos'
  })
}

module.exports = {
  getUserIdentify
}