import { getAuthUserData } from "./auth-reducer";

const SET_INITIALIZED = 'SET_INITIALIZED';

export type InitialStateType = {
    initialized: boolean
}

let initialState = {
    initialized: false
};


const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

type initializedActionType = {
    type: typeof SET_INITIALIZED
}

export const initialized = (): initializedActionType => ({ type: SET_INITIALIZED });

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    promise.then(() => {
        dispatch(initialized())
    })
}

export default appReducer;