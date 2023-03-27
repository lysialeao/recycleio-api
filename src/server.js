const app = require('./app')
require('dotenv').config()

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Recycle.io running on server ${PORT}`))
