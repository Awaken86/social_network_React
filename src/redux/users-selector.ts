import { createSelector } from "reselect"
import { UserType } from "../types/Types";
import { GlobalStateType } from "./redux-store";

export const getSelectorUsers = (state: GlobalStateType) => {
    return state.usersPage.users;
}
export const getResectUsers = createSelector(getSelectorUsers,
    (users: Array<UserType>) => {
        return users.filter(u => true);
    })

export const getPageSize = (state: GlobalStateType) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: GlobalStateType) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: GlobalStateType) => {
    return state.usersPage.currentPage
}
export const getIsLoading = (state: GlobalStateType) => {
    return state.usersPage.isLoading
}
export const getFollowingInProgress = (state: GlobalStateType) => {
    return state.usersPage.followingInProgress
}
export const getPortionSize = (state: GlobalStateType) => {
    return state.usersPage.portionSize
}

