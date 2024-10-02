import AxiosHelper from "../AxiosHelper";

const BaseURL = import.meta.env.VITE_SERVER_URL;
const apiClient = new AxiosHelper(BaseURL);

export const viewFavoriteOutfitOfCustomer = async () => {
    try {
        const response = await apiClient.get("/outfit/favorite", {}, {}, true)

        return response.data

    }catch(error) {
        throw error
    }
} 

export const viewDetailsRecommendationOutfit = async (outfitId) => {
    try {
        const response = await apiClient.get(`/outfit/recommendation/${outfitId}`, {}, {}, true)

        return response.data

    }catch(error) {
        throw error
    }
} 

export const viewDetailsFavoriteOutfit = async (outfitId) => {
    try {
        const response = await apiClient.get(`/outfit/favorite/${outfitId}`, {}, {}, true)

        return response.data

    }catch(error) {
        throw error
    }
} 

export const addFavoriteOutfit = async (outfitId) => {
    try {
        const response = await apiClient.post(`/outfit/favorite?outfitId=${outfitId}`, {} , {}, true)

        return response.data

    }catch(error) {
        throw error
    }
} 

export const removeFavoriteOutfit = async (outfitId) => {
    try {
        const response = await apiClient.delete(`/outfit/favorite/${outfitId}`, {} , {}, true)

        return response.data

    }catch(error) {
        throw error
    }
} 