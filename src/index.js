require('dotenv').config();

const server = require('./server')

const PORT = process.env.PORT || 3300

server.listen(3300, () => {
    console.log(`Le serveur lance sur le port ${PORT}`)
})