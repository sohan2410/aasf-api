import CryptoJS from 'crypto-js'
import Ws from 'App/Services/Ws'
import ApiToken from 'App/Models/ApiToken'
import User from 'App/Models/User'
import Message from 'App/Models/Message'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
const getTokenId = (token?: string | null) => {
  if (!token) {
    return null
  }
  const tokenParts = token.split('.')
  if (tokenParts.length !== 2) {
    return null
  }

  const parsedWordArray = CryptoJS.enc.Base64.parse(tokenParts[0])
  const tokenId: number = +parsedWordArray.toString(CryptoJS.enc.Utf8)
  if (!tokenId || Number.isNaN(tokenId)) {
    return null
  }
  return tokenId
}

Ws.io.on('connection', (socket) => {
  socket.on('chat', async (data) => {
    const id = getTokenId(socket.request.headers.authorization)
    if (!id) return null
    const token = await ApiToken.find(id)
    await token?.load('user')
    const user = token?.user

    const toUser = await User.find(data.to)
    if (!toUser) return null

    const message = await Message.create({ from: user?.id, to: toUser.id, message: data.message })

    socket.emit('chat', message)
  })

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data)
  })
})
