import axios from "axios";
import { UserType } from "../types/Types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "c4c5a305-2ee8-4d24-a88e-fd1650be7162"
    }
})
export type ApiResponseType<D = {}, RC = ResultCodesEmun> = {
    data: D
    messages: Array<string>
    resultCode: RC
}
export enum ResultCodesEmun {
    Succes = 0,
    Error = 1,
}
export enum ResultCodesForCaptcha {
    CaptchaIsRequired = 10
}
export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

