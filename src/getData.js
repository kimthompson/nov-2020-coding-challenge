import fetch from 'node-fetch'

export default async function getData(url) {
  let res = await fetch(url)
  let data = await res.json()
  return data
}
