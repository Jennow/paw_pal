import ApiService from "./api.service";
import { TokenService } from "./token.service";
import NotificationService from "./notification.service";
import { AxiosRequestConfig } from "axios";

class AuthenticationError extends Error {
    errorCode: any;
    constructor(errorCode: any, message: string | undefined) {
        super(message);
        this.name = this.constructor.name;
        if (message != null) {
            this.message = message;
        }
        this.errorCode = errorCode;
    }
}

const AuthService = {
    signIn: async function(signInData: any) {
        const deviceToken = await NotificationService.pushInit();

        const requestData: AxiosRequestConfig = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Basic ' + btoa(process.env.VUE_APP_CLIENT_ID + ':' + process.env.VUE_APP_CLIENT_SECRET)
            },
            url: "/oauth/token",
            data: {
                email: signInData.email,
                password: signInData.password,
                deviceToken: deviceToken,
            }
        };

        try {
            const response = await ApiService.customRequest(requestData);
            TokenService.saveToken(response.data.accessToken);
            // TokenService.saveRefreshToken(response.data.refresh_token);
            ApiService.setHeader();

            ApiService.mount401Interceptor();

            return response.data.accessToken;
        } catch (error) {
            this.catchError(error);
        }
    },
    refreshToken: async function() {
        const refreshToken = TokenService.getRefreshToken();

        const requestData: AxiosRequestConfig = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Basic ' + btoa(process.env.VUE_APP_CLIENT_ID + ':' + process.env.VUE_APP_CLIENT_SECRET)
            },
            url: "/oauth/token",
            data: {
                refreshToken: refreshToken
            }
        };

        try {
            const response = await ApiService.customRequest(requestData);

            TokenService.saveToken(response.data.access_token);
            TokenService.saveRefreshToken(response.data.refresh_token);
            ApiService.setHeader();

            return response.data.access_token;
        } catch (error: any) {
            throw new AuthenticationError(
                error.response.status,
                error.response.data.error_description
            );
        }
    },
    async signOut() {
        let token       = TokenService.getToken();
        let deviceToken = localStorage.getItem('deviceToken');

        if (!token) {
            return;
        }

        const requestData: AxiosRequestConfig = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Basic ' + btoa(process.env.VUE_APP_CLIENT_ID + ':' + process.env.VUE_APP_CLIENT_SECRET)
            },
            url: "/oauth/logout",
            data: {
                token: token,
                deviceToken: deviceToken
            }
        };

        try {
            const response = await ApiService.customRequest(requestData);
            TokenService.removeToken();
            TokenService.removeRefreshToken();
            ApiService.removeHeader();
            ApiService.unmount401Interceptor();
            return response;
        } catch (error) {
            this.catchError(error);
        }

    },
    // signup: async function(email: any, password: any, name: any) {
    //     const signupData: AxiosRequestConfig = {
    //         method: "post",
    //         headers: { "Content-Type": "application/json" },
    //         url: "/oauth/signup",
    //         data: {
    //             email: email,
    //             password: password,
    //             name: name
    //         }
    //     };

    //     try {
    //         return await ApiService.customRequest(signupData);
    //     } catch (error) {
    //         this.catchError(error);
    //     }
    // },
    catchError: function(error: any) {
        let status;
        let description;

        if (error.response === undefined) {
            status = error.message;
            description = error.message;
        } else {
            status = error.response.status;
            description = error.response.data.error_description;
        }

        throw new AuthenticationError(status, description);
    }
}

export { AuthService, AuthenticationError };