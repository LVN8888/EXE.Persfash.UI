import AxiosHelper from "../AxiosHelper";

const BaseURL = import.meta.env.VITE_SERVER_URL;
const apiClient = new AxiosHelper(BaseURL);

export const LoginGoogle = async (token) => {
    try {
        const response = await apiClient.post("/authentication/login-google", {
            token
        })

        return response;
    }catch(error) {
        throw error;
    }
}