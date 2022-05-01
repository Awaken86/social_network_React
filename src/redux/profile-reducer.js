import { ProfileAPI, usersAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCES = 'SAVE_PHOTO_SUCCES'

let initialState = {
    PostData: [
        { id: 1, message: 'Ti v myte che', likesCount: '228', dislikesCount: '3' },
        { id: 1, message: 'how are u???', likesCount: '0', dislikesCount: '33' },
        { id: 1, message: '1000-7?', likesCount: '993', dislikesCount: '7' }
    ],
    profile: null,
    status: ""
};

const profileReducer = (state = initialState, action) => {
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
                profile: {...state.profile, photos: action.photos}
            };
        }

        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText }) /* action creator */
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const savePhotoSucces = (photos) => ({ type: SAVE_PHOTO_SUCCES, photos })

export const getUserProfile = (userId) => async (dispatch) => { /*санки */
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));

}

export const getStatus = (userId) => async (dispatch) => { /*санки */
    let response = await ProfileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
}

export const updateStatus = (status) => async (dispatch) => {/*санки */
    let response = await ProfileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const savePhoto = (file) => async (dispatch) => {/*санки */
    let response = await ProfileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSucces(response.data.data.photos));
    }
}
export default profileReducer;