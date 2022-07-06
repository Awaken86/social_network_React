import { Dispatch } from "redux";
import { FormAction } from "redux-form";
import { ChatApi, ChatMessageApiType, statusType } from "../api/chat-api";
import { BaseThunkType, InferActionsTypes } from "./store-redux";
import { v1 } from 'uuid'

type ChatMessageType = ChatMessageApiType & { id: string }

let initialState = {
    messages: [] as Array<ChatMessageType>,
    status: 'pending' as statusType
};
export type initialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
const chatReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case 'SN/chat/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({ ...m, id: v1() }))]
                    .filter((m, index, array) => index >= array.length - 100)
            }
        case 'SN/chat/STATUS_CHANGER':
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state;
    }
}


export const actions = {
    messagesReceived: (messages: Array<ChatMessageApiType>) => ({
        type: 'SN/chat/MESSAGES_RECEIVED', payload: { messages }
    } as const),
    statusChanger: (status: statusType) => ({
        type: 'SN/chat/STATUS_CHANGER', payload: { status }
    } as const)
}
let _newMessageHandler: ((messages: ChatMessageApiType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

let _statusHandler: ((status: statusType) => void) | null = null
const statusCreator = (dispatch: Dispatch) => {
    if (_statusHandler === null) {
        _statusHandler = (status) => {
            dispatch(actions.statusChanger(status))
        }
    }
    return _statusHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    ChatApi.start()
    ChatApi.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    ChatApi.subscribe('status-changed', statusCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    ChatApi.unSubscribe('messages-received', newMessageHandlerCreator(dispatch))
    ChatApi.unSubscribe('status-changed', statusCreator(dispatch))
    ChatApi.stop()
}

export const sendMessage = (message: string) => async () => {
    ChatApi.sendMessage(message)
}
export default chatReducer;