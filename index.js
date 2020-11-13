import chalk from 'chalk'
import getData from './src/getData'

const MAX_FLOUR = 60000 // in grams

async function app() {
  const data = await getData('https://raw.githubusercontent.com/emilionavarro/daugherty-nov-challenge/main/pastry_orders.json')

  data.forEach((order) => {
    let price = 0
    let flourNeeded = 0

    console.log(chalk.magenta(`${order.length} items`))
    order.forEach((item) => {
      //console.log(`${item.quantity} ${item.name} @ $${item.price} each`)
      price += item.price * item.quantity
      flourNeeded += item.flourConsumption * item.quantity
    })

    console.log(`price: $${price}`)
    console.log(`flour needed: ${Math.round(flourNeeded)} grams`)
  })
}

app()
