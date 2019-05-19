const { cache } = require('../lib')

const moment = require('moment')
const shortid = require('shortid')

module.exports = {
  method: 'POST',
  url: '/register',
  async handler(request) {
    const {
      body: { user }
    } = request

    const {
      name,
      email,
      role = 'customer',
      createdAt = moment().format(),
      id = shortid.generate()
    } = user

    if (!name || !email) throw Error('Provide email and name')

    try {
      // create user in redis
      await cache.set(id, { name, email, role, createdAt, id })
    } catch (e) {}

    // send response
    return {
      accessToken: id
    }
  }
}
