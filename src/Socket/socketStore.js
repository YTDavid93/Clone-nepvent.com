import { io } from 'socket.io-client'
import { ref } from 'vue'

let socketDefault = null

function createConnection(token = '', tenant = '') {
  if (!token || !tenant) {
    console.log('eta')
    return io(`${import.meta.env.VITE_API_HOST}${null}`)
  }
  if (socketDefault) {
    console.log('default exists', socketDefault)
    return socketDefault
  } else {
    socketDefault = io(`${import.meta.env.VITE_API_HOST}${tenant}`, {
      query: {
        token
      }
    })
    console.log('socket', socketDefault)
    return socketDefault
  }
}

export const useSocketIO = () => {
  const socket = createConnection(localStorage.getItem('token'), localStorage.getItem('tenant'))
  return {
    socket
  }
}

export default useSocketIO
