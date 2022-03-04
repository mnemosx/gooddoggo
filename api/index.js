export default async function fetchData() {
  try {
    // TODO: try https://random.dog/woof.json maybe
    // TODO: try https://www.npmjs.com/package/dog-names maybe
    const response = await fetch('https://dog.ceo/api/breeds/image/random/5')
    const json = await response.json()
    return json.message
  } catch (error) {
    console.log(error) // TODO: should be sent to sentry or whatever
  }
}
