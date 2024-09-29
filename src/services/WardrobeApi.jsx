import AxiosHelper from "../AxiosHelper";

const BaseURL = import.meta.env.VITE_SERVER_URL;
const apiClient = new AxiosHelper(BaseURL)

export const viewAllWardrobe = async () => {
    try {
        const response = await apiClient.get("/wardrobe", {}, {}, true)

        return response.data

    }catch(error) {
        throw error
    }
} 

export const viewDetailWardrobe = async (wardrobeId) => {
    try {
        const response = await apiClient.get(`/wardrobe/${wardrobeId}`, {}, {}, true)

        return response.data

    }catch(error) {
        throw error
    }
} 

export const addNewWardrobe = async (title) => {
    try {
        const response = await apiClient.post("/wardrobe", { title }, {}, true)

        return response.data

    }catch(error) {
        throw error
    }
} 

export const updateWardrobe = async (wardrobeId, title) => {
    try {
        const response = await apiClient.put("/wardrobe", { wardrobeId, title }, {}, true)

        return response.data

    }catch(error) {
        throw error
    }
} 

export const removeWardrobe = async (wardrobeId) => {
    try {
        const response = await apiClient.delete(`/wardrobe/${wardrobeId}`, {}, {}, true)

        return response.data

    }catch(error) {
        throw error
    }
} 