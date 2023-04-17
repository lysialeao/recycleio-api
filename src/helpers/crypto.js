const { cryptoInformation } = require('../enum/cryptoInformation')
const crypto = require("crypto")

const cryptoFunction = (pwd) => {
	const cipher = crypto.createCipher(cryptoInformation.algorithm, cryptoInformation.secret)
	cipher.update(pwd)
	return cipher.final(cryptoInformation.type)
}

module.exports = {
  cryptoFunction
}