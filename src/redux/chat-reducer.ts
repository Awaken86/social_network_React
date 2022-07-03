import { Dispatch } from "redux";
import { FormAction } from "redux-form";
import { ChatApi, ChatMessageType } from "../api/chat-api";
import { BaseThunkType, InferActionsTypes } from "./store-redux";

let initialState = {
    messages: [] as Array<ChatMessageType>
};
export type initialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
const chatReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case 'SN/chat/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        default:
            return state;
    }
}


export const actions = {
    messagesReceived: (messages: Array<ChatMessageType>) => ({
        type: 'SN/chat/MESSAGES_RECEIVED', payload: { messages }
    } as const)
}
let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) =>  {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    ChatApi.start()
    ChatApi.subscribe(newMessageHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    ChatApi.unSubscribe(newMessageHandlerCreator(dispatch))
    ChatApi.stop()
}
export const sendMessage = (message: string) => async () => {
    ChatApi.sendMessage(message)
}
export default chatReducer;