const express = require('express')

const app = express()

const routes = require('./routes')
const AppError = require('./utils/AppError')

app.use(express.json())
app.use(routes)

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  console.log(error)

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
})

const PORT = 4444

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))
