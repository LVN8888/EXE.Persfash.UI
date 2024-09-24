import axios from 'axios';

class AxiosHelper {
    constructor(baseURL) {
        // Tạo instance axios với baseURL
        this.client = axios.create({
            baseURL: baseURL,
        });

        // Biến lưu trữ trạng thái refresh token đang xử lý
        this.isRefreshing = false;
        this.refreshSubscribers = [];
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
                {
                    refreshToken: refreshToken, 
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const { accessToken, newRefreshToken } = response.data.data;
    
            // Lưu lại cả accessToken và refreshToken
            this.setAccessToken(accessToken);
            this.setRefreshToken(newRefreshToken);
    
            return accessToken;
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error;
        }
    };    

    // Thêm access token vào headers
    addAuthHeader = (headers = {}) => {
        const token = this.getAccessToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    };

    // Quản lý các subscriber khi refresh token
    onRefreshed = (token) => {
        this.refreshSubscribers.forEach((callback) => callback(token));
        this.refreshSubscribers = [];
    };

    subscribeTokenRefresh = (callback) => {
        this.refreshSubscribers.push(callback);
    };

    // Phương thức xử lý response khi có lỗi 401
    handle401Error = async (originalRequest) => {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            try {
                const newToken = await this.refreshToken();
                this.isRefreshing = false;
                this.onRefreshed(newToken);
            } catch (error) {
                this.isRefreshing = false;
                throw error;
            }
        }

        return new Promise((resolve) => {
            this.subscribeTokenRefresh((token) => {
                originalRequest.headers['Authorization'] = `Bearer ${token}`;
                resolve(this.client(originalRequest));
            });
        });
    };

    // Xử lý lỗi cho tất cả request
    handleError = async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            return this.handle401Error(originalRequest);
        }
        throw error;
    };

    // GET request
    get = async (endpoint, params = {}, headers = {}, checkRefreshToken = false) => {
        try {
            if (checkRefreshToken) {
                headers = this.addAuthHeader(headers);
            }
            const response = await this.client.get(endpoint, { params, headers });
            return response.data;
        } catch (error) {
            return this.handleError(error);
        }
    };

    // POST request
    post = async (endpoint, data = {}, headers = {}, checkRefreshToken = false) => {
        try {
            if (checkRefreshToken) {
                headers = this.addAuthHeader(headers);
            }
            const response = await this.client.post(endpoint, data, { headers });
            return response.data;
        } catch (error) {
            return this.handleError(error);
        }
    };

    // PUT request
    put = async (endpoint, data = {}, headers = {}, checkRefreshToken = false) => {
        try {
            if (checkRefreshToken) {
                headers = this.addAuthHeader(headers);
            }
            const response = await this.client.put(endpoint, data, { headers });
            return response.data;
        } catch (error) {
            return this.handleError(error);
        }
    };

    // DELETE request
    delete = async (endpoint, params = {}, headers = {}, checkRefreshToken = false) => {
        try {
            if (checkRefreshToken) {
                headers = this.addAuthHeader(headers);
            }
            const response = await this.client.delete(endpoint, { params, headers });
            return response.data;
        } catch (error) {
            return this.handleError(error);
        }
    };
}

export default AxiosHelper;