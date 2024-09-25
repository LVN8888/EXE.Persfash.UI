import AxiosHelper from "../AxiosHelper";

const BaseURL = import.meta.env.VITE_SERVER_URL;
const apiClient = new AxiosHelper(BaseURL);

export const uploadImages = async (imagesFile) => {
    try {
        const formData = new FormData();
        
        // Append each image file to the FormData object
        imagesFile.forEach((file) => {
            formData.append('images', file); // 'images' is the key that the server expects
        });

        const response = await apiClient.post('/file/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set the correct content type for file uploads
            },
        });

        return response;

    }catch(error) {
        throw error;
    }
}