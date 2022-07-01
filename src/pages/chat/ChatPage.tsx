import React, { useEffect, useState } from "react";

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
const ChatPage: React.FC = () => {
    return (
        <Chat />
    );
}
const Chat: React.FC = () => {

    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    );
}
const Messages: React.FC = () => {
    const [messages, sendMessages] = useState<Array<ChatMessageType>>([])

    useEffect(() => {
        ws.addEventListener('message', (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            sendMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [])
    return (
        <div style={{ height: '420px', overflowY: 'auto' }}>
            {messages.map((m: any, index) => <Message key={index} message={m} />)}
        </div>
    );
}
const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
    return (
        <div>
            <img src={message.photo} /><b>{message.userName}</b>
            <br />
            {message.message}
            <hr />
        </div>
    );
}
const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const sendMessage = () => {
        if (!message) {
            return
        }
        ws.send(message)
        setMessage('')
    }
    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button onClick={sendMessage}>send</button>
            </div>
        </div>
    );
}
export default ChatPage

