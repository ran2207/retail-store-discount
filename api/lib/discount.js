const moment = require('moment')

class Discount {
  static check(user, order) {
    const { role, createdAt } = user
    const { total, isGrocery } = order

    let orderDetails = {
      total,
      discount: 0,
      totalAfterDiscount: total,
      discountPercentage: 0
    }

    if (isGrocery) {
      return {
        message: 'Discount is not applicable to groceries',
        orderDetails
      }
    }

    if (role === 'employee') {
      const discount = 30

      orderDetails.discount = (total * 30) / 100
      orderDetails.totalAfterDiscount = total - (total * 30) / 100
      orderDetails.discountPercentage = discount

      return {
        message: `Congratulations! You have receiveed an Employee discount of ${discount}%`,
        orderDetails
      }
    }

    if (role === 'affiliate') {
      const discount = 10

      orderDetails.discount = (total * discount) / 100
      orderDetails.totalAfterDiscount = total - (total * discount) / 100
      orderDetails.discountPercentage = discount

      return {
        message: `Congratulations! You have received an Employee discount of ${discount}%`,
        orderDetails
      }
    }

    if (role === 'customer') {
      if (moment.duration(moment().diff(createdAt)).asYears() >= 2) {
        const discount = 5

        orderDetails.discount = (total * discount) / 100
        orderDetails.totalAfterDiscount = total - (total * discount) / 100
        orderDetails.discountPercentage = discount

        return {
          message: `Congratulations! You have received discount of ${discount}% for being our loyal customer for more than 2 years`,
          orderDetails
        }
      }

      if (total >= 100) {
        const discount = 5
        const totalDiscount = Math.floor(total / 100) * discount

        orderDetails.discount = totalDiscount
        orderDetails.totalAfterDiscount = total - totalDiscount
        orderDetails.discountPercentage = (totalDiscount / total) * 100

        return {
          message: `Congratulations! You have received discount of ${
            orderDetails.discountPercentage
          }% 
          `,
          orderDetails
        }
      }

      return {
        message: `Sorry! No discount available`,
        orderDetails
      }
    }
  }
}

module.exports = Discount
