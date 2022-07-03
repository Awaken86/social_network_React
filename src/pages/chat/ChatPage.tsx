import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatMessageType } from "../../api/chat-api";
import { sendMessage, startMessagesListening, stopMessagesListening } from "../../redux/chat-reducer";
import { GlobalStateType } from "../../redux/store-redux";


const ChatPage: React.FC = () => {
    return (
        <Chat />
    );
}
const Chat: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])
    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    );
}
const Messages: React.FC = () => {
    const messages = useSelector((state: GlobalStateType) => state.chat.messages)
    return (
        <div style={{ height: '420px', overflowY: 'auto' }}>
            {messages.map((m: any, index) => <Message key={index} message={m} />)}
        </div>
    );
}
const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
    return (
        <div>
            <img alt={''} src={message.photo} /><b>{message.userName}</b>
            <br />
            {message.message}
            <hr />
        </div>
    );
}
const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
    }
    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button onClick={sendMessageHandler}>send</button>
            </div>
        </div>
    );
}
export default ChatPage

