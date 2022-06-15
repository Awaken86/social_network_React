import { PhotosType } from "../types/Types";
import { instance, ApiResponseType } from "./api";

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/` + userId).then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId).then(res => res.data)

    },
    updateStatus(status: string) {
        return instance.put<ApiResponseType>(`profile/status`, { status: status/*status*/ }).then(res => res.data)

    },
    savePhoto(filePhoto: any) {
        const formData = new FormData();
        formData.append("image", filePhoto)
        return instance.put<ApiResponseType<PhotosType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data);
    }

}