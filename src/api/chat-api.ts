let subscribers = [] as Array<subscriberType>

let ws: WebSocket | null = null

const closeHandler = () => {
    console.log('WebSocketChannel was closed')
    setTimeout(createWSChannel, 3000)
}
const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))
}

function createWSChannel() {
    ws?.removeEventListener('close', closeHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)

}


export const ChatApi = {
    start() {
        createWSChannel()
    },
    stop() {
        subscribers=[]
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.close()
    },
    subscribe(callback: subscriberType) {
        subscribers.push(callback)
        return () => {//первый способ отписаться
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    unSubscribe(callback: subscriberType) {//второй способ отписаться
        subscribers = subscribers.filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }

}






export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
type subscriberType = (messages: Array<ChatMessageType>) => void