import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";



let store = {
    _state: {
        dialogsPage: {
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
            ],
            newMessageText: ""
        },
        profilePage: {
            PostData: [
                { id: 1, message: 'Ti v myte che', likesCount: '228', dislikesCount: '3' },
                { id: 1, message: 'how are u???', likesCount: '0', dislikesCount: '33' },
                { id: 1, message: '1000-7?', likesCount: '993', dislikesCount: '7' }
            ],
            newPostText: 'dima_clown'
        },
        sidebar: {}
    },


    getState() {
        return this._state;
    },
    _callSub() {
        console.log('шота изменилось')
    },
    subscr(observer) {
        this._callSub = observer;
    },
    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSub(this._state);

    }
}


export default store;