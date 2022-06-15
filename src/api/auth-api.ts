import { ApiResponseType, instance, ResultCodesEmun, ResultCodesForCaptcha } from "./api"


type meResponseDataType = {
    id: number
    email: string
    login: string
}
type loginResponseDataType = {
    userId: number
}

export const authAPI = {
    me() {
        return instance.get<ApiResponseType<meResponseDataType>>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<ApiResponseType<loginResponseDataType, ResultCodesEmun | ResultCodesForCaptcha>>(`auth/login`, { email, password, rememberMe, captcha })
            .then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/login`)
    }

}