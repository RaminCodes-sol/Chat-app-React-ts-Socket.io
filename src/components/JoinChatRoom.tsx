
type Props = {
    username: string,
    setUsername: React.Dispatch<React.SetStateAction<string>>,
    roomID: string,
    setRoomID: React.Dispatch<React.SetStateAction<string>>,
    joinRoom: () => void
}


/*------------JoinChatRoom-Component------------*/
const JoinChatRoom = (props: Props) => {
  const { username, setUsername, roomID, setRoomID, joinRoom } = props

  
  /*-------Handle-Submit-------*/
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()    
    joinRoom()
    setUsername('')
    setRoomID('')
  }

  return (
    <div className="w-full">
        <form onSubmit={handleSubmit} className="w-full flex flex-col">
            <input type='text' placeholder="username..." value={username} onChange={e => setUsername(e.target.value)} className="px-2 py-4 mb-3 border-none outline-none rounded-sm" />
            <input type='text' placeholder="roomID..." value={roomID} onChange={e => setRoomID(e.target.value)} className="px-2 py-4 mb-2 border-none outline-none rounded-sm" />
            <button onClick={joinRoom} className="p-3 bg-orange-500 transition-colors hover:bg-orange-600 mt-5 rounded-sm">Join Room</button>
        </form>
    </div>
  )
}

export default JoinChatRoom