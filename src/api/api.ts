import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "c4c5a305-2ee8-4d24-a88e-fd1650be7162"
    }
})
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then((response: { data: any; }) => {
                return response.data;
            });
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId: number) {
        /*кароч пример совместимости со старыми версиями*/
        return ProfileAPI.getProfile(userId);

    }

}
export const ProfileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/` + userId);

    },
    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId);

    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, { status: status/*status*/ });

    },
    savePhoto(filePhoto: any) {
        const formData = new FormData();
        formData.append("image", filePhoto)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post(`auth/login`, { email, password, rememberMe, captcha })
    },
    logout() {
        return instance.delete(`auth/login`)
    }

}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}

