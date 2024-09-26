import AxiosHelper from "../AxiosHelper";

const BaseURL = import.meta.env.VITE_SERVER_URL;
const apiClient = new AxiosHelper(BaseURL)


export const viewSupportQuestion = async (page, size, filter) => {
    try {
        const response = await apiClient.get("/supportquestion", {page, size, filter});

        return response.data;

    }catch(error) {
        throw error
    }
}

export const createSupportQuestion = async (question) => {
    try {
        const response = await apiClient.post("/supportquestion", {question}, {}, true);

        return response.data;

    }catch(error) {
        throw error
    }
}

export const RemoveSupportQuestion = async (supportId) => {
    try {
        const response = await apiClient.delete(`/supportquestion/${supportId}`, {}, {}, true);

        return response.data;

    }catch(error) {
        throw error
    }
}