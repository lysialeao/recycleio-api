
const { cryptoFunction } = require('../helpers/crypto')
const { getUser, checkEmail } = require('../models/userModel')
const { getCollectionPoint } = require('../models/collectionPointsModel')

const getUserIdentify = async (request, response) => {
  const { login, password } = request.body;
  const cipherpwd = cryptoFunction(password);

  const validateUser = ({ user }) => {
    if (!user || user.length < 1) {
      return response.status(401).json({
        error: 'Login ou senha incorretos'
      });
    } else {
      return response.status(200).json({
        success: true,
        user: {
          ...user
        }
      });
    }
  };

  try {
    const user = await getUser({ login, password: cipherpwd });
    if (user && user.length > 0) {
      return validateUser({ user, type: 'cpf' });
    }
  } catch (error) {}

  try {
    const collectionPoint = await getCollectionPoint({ login, password: cipherpwd });
    if (collectionPoint && collectionPoint.length > 0) {
      return validateUser({ user: collectionPoint, type: 'cnpj' });
    }
  } catch (error) {
    return response.status(500).json({
      error: error.message
    });
  }

  return response.status(401).json({
    error: 'Login ou senha incorretos'
  });
}

const checkEmailExists = async (request, response) => {
  const { email } = request.body

  const check = await checkEmail(email)
    .then()
      .catch(({ message }) => response.status(500).json({
        error: message
      }))

  return response.status(200).json({
    success: true,
    emailAlreadyUsed: check
  })

}


module.exports = {
  getUserIdentify, 
  checkEmailExists
}