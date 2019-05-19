const { discount, cache } = require('../lib')

module.exports = {
  method: 'POST',
  url: '/discount',
  async handler(request) {
    const {
      body: { accessToken, order }
    } = request

    if (!accessToken) throw Error('Access token not found')

    const user = await cache.get(accessToken)

    if (user) {
      return discount.check(user, order)
    }

    throw Error('Invalid User')
  }
}
