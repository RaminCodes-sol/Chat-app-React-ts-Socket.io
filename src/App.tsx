import { useState } from 'react'
import JoinChatRoom from "./components/JoinChatRoom"
import Chat from "./components/Chat"
import io from 'socket.io-client'


const socket = io('http://localhost:3001')



const App = () => {
  const [username, setUsername] = useState('')
  const [roomID, setRoomID] = useState('')
  const [showChat, setShowChat] = useState(false)


  /*-------Join-Room-------*/
  const joinRoom = () => {
    if (username !== '' && roomID !== '') {
      socket.emit('join_room', roomID)
      setShowChat(true)
    }
  }
  

  return (
    <main className='w-full max-w-[500px] mx-auto mt-5 flex flex-col items-center py-5'>
      <h1 className='py-3 mb-6 text-2xl'>Chat App</h1>
      <section className='w-full'>
        {
          !showChat
            ? (<JoinChatRoom username={username} setUsername={setUsername} roomID={roomID} setRoomID={setRoomID} joinRoom={joinRoom} />)
            : (<Chat username={username} roomID={roomID} socket={socket} />)
        }
      </section>
    </main>
  )
}

export default App
