const SEND_MESSAGE = 'SEND-MESSAGE'


export type initialStateType = typeof initialState
type dialogsType = {
    id: number
    name: string
}
type messagesType = {
    id: number
    message: string
}
let initialState = {
    dialogsData: [
        { id: 1, name: 'Dima(xyesos)' },
        { id: 2, name: 'Down' },
        { id: 3, name: 'clownada' },
        { id: 4, name: 'lexa ' }
    ] as Array<dialogsType>,
    messagesData: [
        { id: 1, message: '1000-7?' },
        { id: 2, message: 'ny cho tam s dengami?' },
        { id: 3, message: 'lil trash so my no' },
        { id: 4, message: 'чел ты в коде' }
    ] as Array<messagesType>
};


const dialogsReducer = (state = initialState, action: any): initialStateType => {

    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.NewMessageBody;
            return {
                ...state,
                messagesData: [...state.messagesData, { id: 6, message: body }]
            };

        default:
            return state;
    }
}
type sendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    NewMessageBody: string
}
export const sendMessageCreator = (NewMessageBody: string): sendMessageCreatorActionType => ({ type: SEND_MESSAGE, NewMessageBody })


export default dialogsReducer;