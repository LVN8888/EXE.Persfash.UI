import AxiosHelper from "../../AxiosHelper";

const BaseURL = import.meta.env.VITE_SERVER_URL;
const apiClient = new AxiosHelper(BaseURL);

// API to get a list of customers with pagination (including token)
export const viewCustomerList = async (page, size) => {
    try {
        // `true` để chỉ định rằng API yêu cầu kiểm tra token
        const response = await apiClient.get("/customer/view", { page, size }, {}, true);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// API to activate or deactivate a customer by customerId (including token)
export const activateDeactivateCustomer = async (customerId) => {
    try {
        // `true` để chỉ định rằng API yêu cầu kiểm tra token
        const response = await apiClient.put(`/customer/activate-deactivate/${customerId}`, {}, {}, true);
        return response.data;
    } catch (error) {
        throw error;
    }
};
