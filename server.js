const dotenv = require('dotenv')
dotenv.config({path: './config/config.env'})

const app = require('./app')

const localhost = '127.0.0.1'
const port = process.env.PORT || 5000

const server = app.listen(port, localhost, () => {
    console.log(`Listening http://${localhost}:${port}`)
})