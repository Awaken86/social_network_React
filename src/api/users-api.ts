import { GetItemsType, instance, ApiResponseType } from "./api";
import { profileAPI } from "./profile-api";

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term: string = '', friend: null | boolean = null) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(res => res.data)
    },
    follow(userId: number) {
        return instance.post<ApiResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete<ApiResponseType>(`follow/${userId}`).then(res => res.data)
    },
    getProfile(userId: number) {
        /*кароч пример совместимости со старыми версиями*/
        return profileAPI.getProfile(userId).then(res => res)
    }

}