export type statusType = 'pending' | 'ready' | 'error'
export type ChatMessageApiType = {
    message: string
    photo: string
    userId: number
    userName: string
}
type EventsType = 'messages-received' | 'status-changed'
type messagesReceivedSubscriberType = (messages: Array<ChatMessageApiType>) => void
type statusChangedSubscriberType = (status: statusType) => void

const subscribers = {
    'messages-received': [] as Array<messagesReceivedSubscriberType>,
    'status-changed': [] as Array<statusChangedSubscriberType>
}

let ws: WebSocket | null = null

const closeHandler = () => {
    notifyStatus('pending')
    console.log('WebSocketChannel was closed')
    setTimeout(createWSChannel, 3000)
}
const openHandler = () => {
    notifyStatus('ready')
}
const errorHandler = () => {
    notifyStatus('error')
    console.error('error')
}
const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers["messages-received"].forEach(s => s(newMessages))
}
const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
}
const notifyStatus = (status: statusType) => {
    subscribers["status-changed"].forEach(s => s(status))
}
function createWSChannel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifyStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)

}


export const ChatApi = {
    start() {
        createWSChannel()
    },
    stop() {
        subscribers["messages-received"] = []
        subscribers["status-changed"] = []
        cleanUp()
        ws?.close()
    },
    subscribe(Event: EventsType, callback: messagesReceivedSubscriberType | statusChangedSubscriberType) {
        //@ts-ignore
        subscribers[Event].push(callback)
        return () => {//первый способ отписаться
            //@ts-ignore
            subscribers[Event] = subscribers[Event].filter(s => s !== callback)
        }
    },
    unSubscribe(Event: EventsType, callback: messagesReceivedSubscriberType | statusChangedSubscriberType) {//второй способ отписаться
        //@ts-ignore
        subscribers[Event] = subscribers[Event].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }

}






