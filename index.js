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

    order.forEach((item) => {
      price += item.price * item.quantity
      flourNeeded += item.flourConsumption * item.quantity
    })

    order.price = price
    order.flourNeeded = flourNeeded
  })

  // sort by price
  data = data.sort((a, b) => b.price - a.price)

  data.forEach((order, i) => {
    console.log(chalk.red(`\n${i}`))
    console.log('-------')
    console.log(`price: $${order.price}`)
    console.log(`flour needed: ${Math.round(order.flourNeeded)} grams`)
  })
}

app()
