import chalk from 'chalk'
import getData from './src/getData'

const MAX_FLOUR = 60000 // in grams

async function app() {
  let data = await getData('https://raw.githubusercontent.com/emilionavarro/daugherty-nov-challenge/main/pastry_orders.json')

  // get rid of empty orders
  data = data.filter((d) => d.length > 0)

  // calculate each order's price and required flour
  data.forEach((order, i) => {
    let price = 0
    let flourNeeded = 0
    let isInvalid = false

    order.forEach((item) => {
      price += item.price * item.quantity
      flourNeeded += item.flourConsumption * item.quantity
      if (item.quantity > item.customerLimit) {
        console.log('invalid order')
        isInvalid = true
      }
    })

    order.id = i
    order.price = price
    order.flourNeeded = flourNeeded
    order.ratio = price / flourNeeded
    order.isInvalid = isInvalid
  })

  // get rid of invalid orders (customer exceeds limit)
  data = data.filter((d) => !d.isInvalid)

  // sort by ratio ($$ earned per gram of flour used)
  data = data.sort((a, b) => b.ratio - a.ratio)

  let totalFlour = 0
  let filledOrders = []
  let moneyEarned = 0
  
  // loop through the data, biggest ratio items first, getting as close to 60000 grams as possible
  data.forEach((order) => {
    let newFlour = totalFlour + order.flourNeeded 

    if (newFlour <= MAX_FLOUR) {
      totalFlour += order.flourNeeded
      moneyEarned += order.price
      filledOrders.push(order)
    }
  })

  // Print out array of chosen orders and attributes about it (flour used, money made, etc.)
  console.log('filled orders:', filledOrders)
  console.log('--------------')
  console.log(chalk.blue('flour used: ') + `${totalFlour} grams`)
  console.log(chalk.magenta('orders filled: ') + `${filledOrders.length}`)
  console.log(chalk.red('money earned: ') + `$${moneyEarned.toFixed(2)}`)
  console.log('--------------')

  return filledOrders
}

app()
