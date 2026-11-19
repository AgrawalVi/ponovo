import 'server-only'

export const receiveMessage = async (message: string) => {
  console.log(JSON.parse(message))
}
