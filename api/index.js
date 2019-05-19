const { PORT } = process.env

const cors = require('cors')
const fastify = require('fastify')

const server = fastify()

server.register(require('fastify-serve-swagger-ui'), {
  // swagger specification which should be exposed
  specification: {
    type: 'file',
    path: 'swagger.json'
  },
  // path under which swagger-ui will be available
  path: 'swagger'
})

server.use(cors())

const routes = require('./routes')

server.register(routes, {
  prefix: 'api'
})

server.listen(PORT, '0.0.0.0', err => {
  if (err) {
    throw err
  }
})

module.exports = server
