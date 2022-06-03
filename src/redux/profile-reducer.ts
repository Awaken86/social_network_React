import { ProfileAPI, usersAPI } from "../api/api";
import { PostDataType, ProfileType } from "../types/Types";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCES = 'SAVE_PHOTO_SUCCES'


let initialState = {
    PostData: [
        { id: 1, message: 'Ti v myte che', likesCount: 228, dislikesCount: 3 },
        { id: 1, message: 'how are u???', likesCount: 0, dislikesCount: 33 },
        { id: 1, message: '1000-7?', likesCount: 993, dislikesCount: 7 }
    ] as Array<PostDataType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
};
export type initialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0,
                dislikesCount: 0
            };
            let copyState = {
                ...state,
                PostData: [...state.PostData, newPost],
                newPostText: ''
            };
            return copyState;
        }
        case SET_USER_PROFILE: {
            return {
                ...state, profile: action.profile
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        case SAVE_PHOTO_SUCCES: {
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
            };
        }

        default:
            return state;
    }
}

type addPostActionCreatorType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText: string): addPostActionCreatorType => ({ type: ADD_POST, newPostText }) /* action creator */

type setUserProfileActionCreatorType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): setUserProfileActionCreatorType => ({ type: SET_USER_PROFILE, profile })

type setStatusActionCreatorType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): setStatusActionCreatorType => ({ type: SET_STATUS, status })

type savePhotoSuccesActionCreatorType = {
    type: typeof SAVE_PHOTO_SUCCES
    photos: string
}
export const savePhotoSucces = (photos: string): savePhotoSuccesActionCreatorType => ({ type: SAVE_PHOTO_SUCCES, photos })

export const getUserProfile = (userId: number) => async (dispatch: any) => { /*санки */
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));

}

export const getStatus = (userId: number) => async (dispatch: any) => { /*санки */
    let response = await ProfileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
}

export const updateStatus = (status: string) => async (dispatch: any) => {/*санки */
    let response = await ProfileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const savePhoto = (file: any) => async (dispatch: any) => {/*санки */
    let response = await ProfileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSucces(response.data.data.photos));
    }
}
export default profileReducer;