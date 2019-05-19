const discount = require('./discount')
const register = require('./register')

module.exports = (fastify, options, next) => {
  fastify.route(discount)
  fastify.route(register)

  next()
}
