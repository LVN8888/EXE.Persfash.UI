import axios from 'axios';

class AxiosHelper {
    constructor(baseURL) {
        this.client = axios.create({
            baseURL: baseURL,
        });

        // Biến lưu trữ trạng thái refresh token đang xử lý
        this.isRefreshing = false;
        this.refreshSubscribers = [];

        // Interceptor để xử lý lỗi 401
        this.client.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                // Nếu là lỗi 401 và chưa được retry
                if (error.response && error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true; // Đánh dấu rằng request này đã được retry

                    if (!this.isRefreshing) {
                        this.isRefreshing = true;

                        try {
                            const newToken = await this.refreshToken(); // Gọi refresh token
                            this.isRefreshing = false;
                            this.onRefreshed(newToken); // Gọi lại tất cả các request chờ
                        } catch (error) {
                            this.isRefreshing = false;
                            return Promise.reject(error); // Nếu refresh token thất bại
                        }
                    }

                    // Chờ refresh token hoàn tất và thực hiện lại request gốc
                    return new Promise((resolve, reject) => {
                        this.subscribeTokenRefresh((token) => {
                            originalRequest.headers['Authorization'] = `Bearer ${token}`;
                            resolve(this.client(originalRequest)); // Thực hiện lại request với token mới
                        });
                    });
                }

                return Promise.reject(error); // Nếu không phải lỗi 401, trả về lỗi
            }
        );
    }

    // Lấy accessToken từ localStorage
    getAccessToken = () => {
        return localStorage.getItem('accessToken');
    };

    // Lấy refreshToken từ localStorage
    getRefreshToken = () => {
        const token = localStorage.getItem('refreshToken');
        if (!token) {
            throw new Error('No refresh token found');
        }
        return token;
    };

    // Cập nhật accessToken vào localStorage
    setAccessToken = (token) => {
        localStorage.setItem('accessToken', token);
    };

    // Cập nhật refreshToken vào localStorage
    setRefreshToken = (token) => {
        localStorage.setItem('refreshToken', token);
    };

    // Xử lý refresh token và lưu cả accessToken và refreshToken mới
    refreshToken = async () => {
        const refreshToken = this.getRefreshToken();
        try {
            const response = await this.client.post(
                '/refreshtoken',
                { refreshToken },
                { headers: { 'Content-Type': 'application/json' } }
            );
            const { accessToken, newRefreshToken } = response.data.data;

            // Lưu lại accessToken và refreshToken mới
            this.setAccessToken(accessToken);
            this.setRefreshToken(newRefreshToken);

            return accessToken;
        } catch (error) {
            throw new Error('Failed to refresh token');
        }
    };

    // Quản lý các subscribers khi refresh token
    onRefreshed = (token) => {
        this.refreshSubscribers.forEach((callback) => callback(token));
        this.refreshSubscribers = [];
    };

    // Thêm các subscribers chờ token refresh
    subscribeTokenRefresh = (callback) => {
        this.refreshSubscribers.push(callback);
    };

    // Thêm access token vào headers
    addAuthHeader = (headers = {}) => {
        const token = this.getAccessToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    };

    // GET request
    get = async (endpoint, params = {}, headers = {}, checkRefreshToken = false) => {
        if (checkRefreshToken) {
            headers = this.addAuthHeader(headers);
        }
        const response = await this.client.get(endpoint, { params, headers });
        return response.data;
    };

    // POST request
    post = async (endpoint, data = {}, headers = {}, checkRefreshToken = false) => {
        if (checkRefreshToken) {
            headers = this.addAuthHeader(headers);
        }
        const response = await this.client.post(endpoint, data, { headers });
        return response.data;
    };

    // PUT request
    put = async (endpoint, data = {}, headers = {}, checkRefreshToken = false) => {
        if (checkRefreshToken) {
            headers = this.addAuthHeader(headers);
        }
        const response = await this.client.put(endpoint, data, { headers });
        return response.data;
    };

    // DELETE request
    delete = async (endpoint, params = {}, headers = {}, checkRefreshToken = false) => {
        if (checkRefreshToken) {
            headers = this.addAuthHeader(headers);
        }
        const response = await this.client.delete(endpoint, { params, headers });
        return response.data;
    };
}

export default AxiosHelper;
