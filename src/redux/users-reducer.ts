import { usersAPI } from '../api/api'
import { UserType } from '../types/Types';
import { updateObjectInArray } from '../utils/object-helper';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UPFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_LOADER = 'TOGGLE_LOADER';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 20,
    currentPage: 1,
    isLoading: false,
    followingInProgress: [] as Array<number>, //array of users ids
    portionSize: 15

};
type InitialState = typeof initialState

const usersReducer = (state = initialState, action: any): InitialState => {
    switch (action.type) {
        case FOLLOW:
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
        case UNFOLLOW:
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
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state, totalUsersCount: action.count
            }
        case TOGGLE_LOADER:
            return {
                ...state, isLoading: action.isLoading
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
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

type followSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number): followSuccessActionType => ({ type: FOLLOW, userId })

type unfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): unfollowSuccessActionType => ({ type: UNFOLLOW, userId })

type setUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): setUsersActionType => ({ type: SET_USERS, users })

type setCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): setCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage })

type setUsersTotalCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
export const setUsersTotalCount = (totalUsersCount: number): setUsersTotalCountActionType => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })

type setLoaderActionType = {
    type: typeof TOGGLE_LOADER
    isLoading: boolean
}
export const setLoader = (isLoading: boolean): setLoaderActionType => ({ type: TOGGLE_LOADER, isLoading })

type toggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isLoading: boolean
    userId: number
}
export const toggleFollowingProgress = (isLoading: boolean, userId: number): toggleFollowingProgressActionType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isLoading, userId })


export const getUsers = (currentPage: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(setLoader(true));
        dispatch(setCurrentPage(currentPage))
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(setLoader(false));
        dispatch(setUsers(data.items));
        dispatch(setUsersTotalCount(data.totalCount));
    };
}

const followUnfollow = async (dispatch: any, userId: number, apiMetod: any, actionCreator: any) => {
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMetod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId: number) => {
    return async (dispatch: any) => {
        followUnfollow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
    };
}

export const unfollow = (userId: number) => {
    return async (dispatch: any) => {
        followUnfollow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
    };
}
export default usersReducer;