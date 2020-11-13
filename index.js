import getData from './src/getData'

let data

async function app() {
  data = await getData('https://raw.githubusercontent.com/emilionavarro/daugherty-nov-challenge/main/pastry_orders.json')

  console.log('data', data)
}

app()
