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

export const UpdatePaymentSubscriptionStatus = async (paymentId, status) => {
    try {
        const paymentUpdateReqModel = {
            paymentId,
            status
        }
        const response = await apiClient.put("/subscription/subscribe", paymentUpdateReqModel, {}, true )

        return response.data;
    }catch(error) {
        throw error
    }
}