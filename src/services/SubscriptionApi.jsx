import AxiosHelper from "../AxiosHelper";

const BaseURL = import.meta.env.VITE_SERVER_URL;
const apiClient = new AxiosHelper(BaseURL)

export const viewSubscription = async (page = 1, size = 10) => {
    try {
        const response = await apiClient.get("/subscription", {page, size })

        return response;
    }catch(error) {
        throw error
    }
}