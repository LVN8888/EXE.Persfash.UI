import AxiosHelper from "../AxiosHelper";

const BaseURL = import.meta.env.VITE_SERVER_URL;
const apiClient = new AxiosHelper(BaseURL);

export const forgotPassword = async (email) => {
    try {
        const response = await apiClient.post("/authentication/forgot-password", {
            email
        })

        return response;

    }catch(error) {
        throw error
    }
}

export const changePassword = async (oldPassword, newPassword) => {
    try {
        const response = await apiClient.post("/authentication/change-password", {
            oldPassword,
            newPassword
        }, {}, true)

        return response;
    }catch(error) {
        throw error;
    }
}

export const resetPassword = async (otp, newPassword,
    confirmNewPassword,
    email
) => {
    try {
        const response = await apiClient.post("/authentication/reset-password", {
            otp,
            newPassword,
            confirmNewPassword,
            email
        })

        return response;
    }catch(error) {
        throw error;
    }
}