import { profileAPI } from "../api/profile-api";
import { usersAPI } from "../api/users-api";
import { PhotosType, PostDataType, ProfileType } from "../types/Types";
import { BaseThunkType, InferActionsTypes } from "./store-redux";






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
type ThunkType = BaseThunkType<ActionsType>
type ActionsType = InferActionsTypes<typeof actions>

const profileReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'SN/profile/ADD-POST': {
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
        case 'SN/profile/SET_USER_PROFILE': {
            return {
                ...state, profile: action.profile
            };
        }
        case 'SN/profile/SET_STATUS': {
            return {
                ...state,
                status: action.status
            };
        }
        case 'SN/profile/SAVE_PHOTO_SUCCES': {
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
            };
        }

        default:
            return state;
    }
}

export const actions = {
    addPostActionCreator: (newPostText: string) => ({ type: 'SN/profile/ADD-POST', newPostText } as const),
    setUserProfile: (profile: ProfileType) => ({ type: 'SN/profile/SET_USER_PROFILE', profile } as const),
    setStatus: (status: string) => ({ type: 'SN/profile/SET_STATUS', status } as const),
    savePhotoSucces: (photos: PhotosType) => ({ type: 'SN/profile/SAVE_PHOTO_SUCCES', photos } as const)
}


export const getUserProfile = (userId: number): ThunkType => async (dispatch) => { /*санки */
    let data = await usersAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data));

}
export const getStatus = (userId: number): ThunkType => async (dispatch) => { /*санки */
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data));
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {/*санки */
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status));
    }
}
export const savePhoto = (file: File): ThunkType => async (dispatch) => {/*санки */
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSucces(data.data.photos));
    }
}
export default profileReducer;