const Discount = require('../lib/discount')

describe('Get discount depending role, item type and registration date', async () => {
  it('should give no discount for groceries', async () => {
    const user = { role: 'customer', createdAt: '2019-04-15T23:27:57+04:00' }
    const order = {
      total: 23,
      isGrocery: true
    }
    const discount = await Discount.check(user, order)
    const expected = 'Discount is not applicable to groceries'

    expect(discount.message).toEqual(expected)
  })

  it('should give employee discount of 30%', async () => {
    const user = { role: 'employee', createdAt: '2019-04-15T23:27:57+04:00' }
    const order = {
      total: 23,
      isGrocery: false
    }
    const discount = await Discount.check(user, order)
    const expected = 30

    expect(discount.orderDetails.discountPercentage).toEqual(expected)
  })

  it('should give affiliate discount of 10%', async () => {
    const user = { role: 'affiliate', createdAt: '2019-04-15T23:27:57+04:00' }
    const order = {
      total: 23,
      isGrocery: false
    }
    const discount = await Discount.check(user, order)
    const expected = 10

    expect(discount.orderDetails.discountPercentage).toEqual(expected)
  })

  it('should give customer discount of 5% for customers who have registered 2 or more years ago', async () => {
    const user = { role: 'customer', createdAt: '2016-04-15T23:27:57+04:00' }
    const order = {
      total: 123,
      isGrocery: false
    }
    const discount = await Discount.check(user, order)
    const expected = 5

    expect(discount.orderDetails.discountPercentage).toEqual(expected)
  })

  it('should give customer discount of 5 for above 100$', async () => {
    const user = { role: 'customer', createdAt: '2019-04-15T23:27:57+04:00' }
    const order = {
      total: 123,
      isGrocery: false
    }
    const discount = await Discount.check(user, order)
    const expected = [5, 4.0650406504065035]

    expect(discount.orderDetails.discount).toEqual(expected[0])
    expect(discount.orderDetails.discountPercentage).toEqual(expected[1])
  })

  it('should give any discount for total less 100$ and customer not registered more than 2 years ago', async () => {
    const user = { role: 'customer', createdAt: '2018-04-15T23:27:57+04:00' }
    const order = {
      total: 23,
      isGrocery: false
    }
    const discount = await Discount.check(user, order)
    const expected = [0, 0]

    expect(discount.orderDetails.discount).toEqual(expected[0])
    expect(discount.orderDetails.discountPercentage).toEqual(expected[1])
  })
})
