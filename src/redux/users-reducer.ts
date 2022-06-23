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
    portionSize: 15,
    filter: {
        term: ''
    }
};
export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter



const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/USERS/FOLLOW':
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
        case 'SN/USERS/UNFOLLOW':
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
        case 'SN/USERS/SET_USERS':
            return {
                ...state,
                users: action.users
            }
        case 'SN/USERS/SET_CURRENT_PAGE':
            return {
                ...state, currentPage: action.currentPage
            }
        case 'SN/USERS/SET_TOTAL_USERS_COUNT':
            return {
                ...state, totalUsersCount: action.count
            }
        case 'SN/USERS/TOGGLE_LOADER':
            return {
                ...state, isLoading: action.isLoading
            }
        case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isLoading
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        case 'SN/USERS/SET_FILTER':
            return {
                ...state,
                filter: action.payload
            }
        default:
            return state;
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>
export const actions = {
    followSuccess: (userId: number) => ({ type: 'SN/USERS/FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: 'SN/USERS/UNFOLLOW', userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: 'SN/USERS/SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SN/USERS/SET_CURRENT_PAGE', currentPage } as const),
    setUsersTotalCount: (totalUsersCount: number) => ({ type: 'SN/USERS/SET_TOTAL_USERS_COUNT', count: totalUsersCount } as const),
    setLoader: (isLoading: boolean) => ({ type: 'SN/USERS/TOGGLE_LOADER', isLoading } as const),
    toggleFollowingProgress: (isLoading: boolean, userId: number) => ({ type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS', isLoading, userId } as const),
    SetFilter: (term: string) => ({ type: 'SN/USERS/SET_FILTER', payload: { term } } as const),
}

type ThunkType = BaseThunkType<ActionsTypes>

export const getUsers = (currentPage: number, pageSize: number, term: string): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setLoader(true));
        dispatch(actions.setCurrentPage(currentPage))
        dispatch(actions.SetFilter(term))
        let data = await usersAPI.getUsers(currentPage, pageSize, term)
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