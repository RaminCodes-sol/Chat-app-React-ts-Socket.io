import React,{ useState, useEffect } from 'react'
import { BsSendFill } from "react-icons/bs"
import ScrollToBottom from 'react-scroll-to-bottom'


type Props = {
  username: string,
  roomID: string,
  socket: any
}

type MessageType = {
  roomID: string,
  username: string,
  message: string,
  time: string
}


/*------------Chat-Component------------*/
const Chat = ({ username, roomID, socket }: Props) => {
  const [message, setMessage] = useState('')
  const [messageList, setMessageList] = useState<MessageType[]>([])
  

  /*-------Send-Message-------*/
  const sendMessage = async () => {
    if (message !== '') {
      const messageData = {
        roomID,
        username,
        message,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
      }

      await socket.emit('send_message', messageData)
      setMessageList((prevList) => [...prevList, messageData])
      setMessage('')
    }
  }


  /*-------Handle-Submit-------*/
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendMessage()
  }


  /*-------Handle-Message-Received-------*/
  const handleMessageReceived = (data: MessageType) => {
    setMessageList(prevList => [...prevList, data])
  }
  


  /*-------Get-Messages-------*/
  useEffect(() => {
    socket.on('receive_message', handleMessageReceived)

    return () => socket.off('receive_message', handleMessageReceived)
  }, [socket])




  return (
    <section className='w-full border flex flex-col items-center'>

      {/*-------Chat-Header-------*/}
      <div id="chat-header" className='w-full flex justify-between px-4 py-3 bg-gray-600'>
        <span>Live Chat</span>
        <h3>
          username: <span className='text-orange-500'>{username}</span> 
          -
          roomID: <span className='text-orange-500'>{roomID}</span>
        </h3>
      </div>

      {/*-------Chat-Body-------*/}
      <div id="chat-body" className='w-full h-[300px]'>
        <ScrollToBottom className='w-[100%] h-[100%]'>
          {
            messageList?.map((messageContent, index) => {
              return(
                <div key={index} className={`${username === messageContent.username ? 'justify-end': 'justify-start'} flex px-4 w-auto py-2`}>
                  <div className={`${username === messageContent.username ? 'bg-blue-500 rounded-lg rounded-tr-none': 'bg-green-500 rounded-lg rounded-tl-none'} max-w-[300px] p-2`}>
                    <p className='font-semibold'>{messageContent.message}</p>
                    <div className='flex gap-2 mt-1'>
                      <span className='text-xs text-black'>{messageContent.time}</span>
                      <span className='text-xs text-black'>{messageContent.username}</span>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </ScrollToBottom>
      </div>

      {/*-------Chat-Footer-------*/}
      <div id="chat-footer" className='w-full'>
        <form onSubmit={handleSubmit} className='w-full flex border'>
          <input type='text' placeholder='message...' value={message} onChange={e => setMessage(e.target.value)} className='flex-1 px-2 py-3 border-none outline-none'/>
          <button className='bg-green-500 w-[50px] transition-colors hover:bg-green-600'><BsSendFill /></button>
        </form>
      </div>

    </section>
  )
}

export default React.memo(Chat)
