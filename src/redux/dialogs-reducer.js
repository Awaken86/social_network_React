const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState = {
    dialogsData: [
        { id: 1, name: 'Dima(xyesos)' },
        { id: 2, name: 'Down' },
        { id: 3, name: 'clownada' },
        { id: 4, name: 'lexa ' }
    ],
    messagesData: [
        { id: 1, message: '1000-7?' },
        { id: 2, message: 'ny cho tam s dengami?' },
        { id: 3, message: 'lil trash so my no' },
        { id: 4, message: 'чел ты в коде' }
    ]
};

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.NewMessageBody;
            return {
                ...state,
                messagesData: [...state.messagesData ,{ id: 6, message: body }]   
            };

        default:
            return state;
    }
}
export const sendMessageCreator = (NewMessageBody) => ({ type: SEND_MESSAGE, NewMessageBody})


export default dialogsReducer;