import { createSelector } from "reselect"

export const getSelectorUsers = (state) => {
    return state.usersPage.users;
}
export const getResectUsers = createSelector(getSelectorUsers,
    (users) => {
        return users.filter(u => true);
    })

export const getPageSize = (state) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}
export const getIsLoading = (state) => {
    return state.usersPage.isLoading
}
export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress
}
export const getPortionSize = (state) => {
    return state.usersPage.portionSize
}

