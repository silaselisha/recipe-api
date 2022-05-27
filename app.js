const express = require('express')
const morgan = require('morgan')

const recipeRoute = require('./routes/recipeRoute')
const globalErrorHandler = require('./controllers/errorHandler')
const AppError = require('./utils/appError')

const app = express()
app.use(morgan('dev'))
app.use(express.static(`${__dirname}/public`))
app.use(express.json())

app.use('/recipes', recipeRoute)

app.all('*', (req, res, next) => {
    return next(new AppError(`Endpoint not found in the server`, 404))
})

app.use(globalErrorHandler)
module.exports = app