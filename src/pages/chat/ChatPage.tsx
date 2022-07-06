import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatMessageApiType } from "../../api/chat-api";
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
    const messagesRef = useRef<HTMLDivElement>(null)
    const [autoScroll, setAutoScroll] = useState(true)
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        var element = e.currentTarget
        if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 100) {
            !autoScroll && setAutoScroll(true)
        } else {
            autoScroll && setAutoScroll(false)
        }
    }
    useEffect(() => {
        if (autoScroll === true) {
            messagesRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' })
        }
    }, [messages])
    return (
        <div style={{ height: '420px', overflowY: 'auto' }} onScroll={scrollHandler}>
            {messages.map((m: any, index) => <Message key={index} message={m} />)}
            <div ref={messagesRef}></div>
        </div>
    );
}
const Message: React.FC<{ message: ChatMessageApiType }> = React.memo(({ message }) => {
    return (
        <div>
            <img alt={''} src={message.photo} /><b>{message.userName}</b>
            <br />
            {message.message}
            <hr />
        </div>
    );
})
const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const status = useSelector((state: GlobalStateType) => state.chat.status)
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
                <button disabled={status === 'pending'} onClick={sendMessageHandler}>send</button>
            </div>
        </div>
    );
}
export default ChatPage

