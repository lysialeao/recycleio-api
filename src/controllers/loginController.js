
const { cryptoFunction } = require('../helpers/crypto')
const { getUser } = require('./userController')
const { getCollectionPoint } = require('./collectionController')

const getUserIdentify = async (request, response) => {

  const { login, password, type } = request.body

  const cipherpwd = cryptoFunction(password)

  if ( type === 'cpf') {

    const user = await getUser({ login, password: cipherpwd})
      .then()
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
      .then()
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