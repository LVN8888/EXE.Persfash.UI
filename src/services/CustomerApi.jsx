import AxiosHelper from "../AxiosHelper";

const BaseURL = import.meta.env.VITE_SERVER_URL;
const apiClient = new AxiosHelper(BaseURL);

export const customerRegister = async (username, email, password, confirmPassword, fullName, gender, dateOfBirth) => {
    try {
        const response = await apiClient.post("/customer/register", {
            username,
            email,
            password,
            confirmPassword,
            fullName,
            gender,
            dateOfBirth
        })

        return response;

    }catch(error) {
        throw error
    }
}