import React, { useEffect, useState } from "react";

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
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)
    useEffect(() => {
        let ws: WebSocket
        const closeHandler = () => {
            console.log('WebSocketChannel was closed')
            setTimeout(createWSChannel, 3000)
        }
        function createWSChannel() {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
            ws.addEventListener('close', closeHandler)
            setWsChannel(ws)
            debugger
        }
        createWSChannel()
        return () => {
            ws?.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])

    return (
        <div>
            <Messages wsChannel={wsChannel} />
            <AddMessageForm wsChannel={wsChannel} />
        </div>
    );
}
const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
    const [messages, sendMessages] = useState<Array<ChatMessageType>>([])

    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data);
            sendMessages((prevMessages) => [...prevMessages, ...newMessages]);
        };
        wsChannel?.addEventListener('message', messageHandler)
        return () => {
            wsChannel?.removeEventListener('message', messageHandler)
        }
    }, [wsChannel])
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
const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
    useEffect(() => {
        let openHandler = () => {
            setReadyStatus('ready')
        }
        wsChannel?.addEventListener('open', openHandler)
        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel])
    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChannel?.send(message)
        setMessage('')
    }
    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button disabled={wsChannel === null || readyStatus !== 'ready'} onClick={sendMessage}>send</button>
            </div>
        </div>
    );
}
export default ChatPage

