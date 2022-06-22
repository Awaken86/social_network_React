import { Dispatch } from 'react';
import { ApiResponseType, ResultCodesEmun } from '../api/api';
import { usersAPI } from '../api/users-api';
import { UserType } from '../types/Types';
import { updateObjectInArray } from '../utils/object-helper';
import { BaseThunkType, InferActionsTypes } from './redux-store';



let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 20,
    currentPage: 1,
    isLoading: false,
    followingInProgress: [] as Array<number>, //array of users ids
    portionSize: 15
};
export type InitialState = typeof initialState



const usersReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { follower: true })
                /*
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, follower: true }
                    }
                    return u;
                })
                */
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { follower: false })
                /*
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, follower: false }
                    }
                    return u;
                })
                */
            }
        case 'SET_USERS':
            return {
                ...state,
                users: action.users
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state, currentPage: action.currentPage
            }
        case 'SET_TOTAL_USERS_COUNT':
            return {
                ...state, totalUsersCount: action.count
            }
        case 'TOGGLE_LOADER':
            return {
                ...state, isLoading: action.isLoading
            }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isLoading
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>
export const actions = {
    followSuccess: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
    setUsersTotalCount: (totalUsersCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', count: totalUsersCount } as const),
    setLoader: (isLoading: boolean) => ({ type: 'TOGGLE_LOADER', isLoading } as const),
    toggleFollowingProgress: (isLoading: boolean, userId: number) => ({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isLoading, userId } as const)
}

type ThunkType = BaseThunkType<ActionsTypes>

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setLoader(true));
        dispatch(actions.setCurrentPage(currentPage))
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(actions.setLoader(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setUsersTotalCount(data.totalCount));
    };
}


type DispatchType = Dispatch<ActionsTypes>

const _followUnfollow = async (dispatch: DispatchType,
    userId: number,
    apiMethod: (userId: number) => Promise<ApiResponseType>,
    actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.resultCode === ResultCodesEmun.Succes) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
}
export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess);
    };
}
export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);
    };
}

export default usersReducer;