import AxiosHelper from "../../AxiosHelper";

const BaseURL = import.meta.env.VITE_SERVER_URL;
const apiClient = new AxiosHelper(BaseURL);

// API để lấy dữ liệu dashboard tổng quan
export const getDashboardData = async () => {
    try {
        const response = await apiClient.get("/dashboard", {}, {}, true);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// API để lấy dữ liệu theo khoảng thời gian với query string trực tiếp
export const getDashboardDataByDate = async (startDate, endDate) => {
    try {
        // Gửi request với query string trực tiếp trong URL
        const response = await apiClient.get(
            `/dashboard/date-range?startDate=${startDate}&endDate=${endDate}`,
            {}, // Không sử dụng params
            {},
            true
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
