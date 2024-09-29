import AxiosHelper from "../../AxiosHelper"; // Đảm bảo đường dẫn đến AxiosHelper là chính xác

const BaseURL = import.meta.env.VITE_SERVER_URL;
const apiClient = new AxiosHelper(BaseURL);

// API to get the list of subscriptions
export const getSubscriptions = async (page, size) => {
    try {
        // Gọi API để lấy danh sách subscriptions, sử dụng token từ headers
        const response = await apiClient.get("/subscription", { page, size }, {}, true);
        return response.data;  // Trả về dữ liệu từ API
    } catch (error) {
        throw error;  // Ném lỗi ra ngoài nếu xảy ra vấn đề
    }
};

// API to update a subscription by subscriptionId
export const updateSubscription = async (subscriptionId, data) => {
    try {
        // Gọi API để cập nhật subscription, sử dụng token từ headers
        const response = await apiClient.put(`/subscription`, {
            subscriptionId: subscriptionId,
            ...data  // Truyền dữ liệu subscription mới
        }, {}, true);
        return response.data;  // Trả về phản hồi từ API
    } catch (error) {
        throw error;  // Ném lỗi ra ngoài nếu xảy ra vấn đề
    }
};
