import { getAuthUserData } from "./auth-reducer";
import { BaseThunkType, InferActionsTypes } from "./redux-store";


let initialState = {
    initialized: false
};
type ActionsTypes = InferActionsTypes<typeof actions>
type InitialStateType = typeof initialState
type ThunkType = BaseThunkType<ActionsTypes>

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/APP/SET_INITIALIZED':
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

export const actions = {
    initializedSucces: () => ({ type: 'SN/APP/SET_INITIALIZED' } as const)
}


export const initializeApp = () => (dispatch:any) => {
    let promise = dispatch(getAuthUserData());
    promise.then(() => {
        dispatch(actions.initializedSucces())
    })
}

export default appReducer;