import AxiosHelper from "../AxiosHelper";

const BaseURL = import.meta.env.VITE_SERVER_URL;
const apiClient = new AxiosHelper(BaseURL)

export const createPaymentSubscriptionUrl = async (subscriptionId, redirectUrl) => {
    try {
        const subscriptionPaymentReqModel = {
            subscriptionId,
            redirectUrl
        }
        const response = await apiClient.post("/subscription/subscribe", subscriptionPaymentReqModel, {}, true)

        return response.data

    }catch(error) {
        throw error
    }
} 