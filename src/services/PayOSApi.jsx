import AxiosHelper from "../AxiosHelper";

const BaseURL = import.meta.env.VITE_SERVER_URL;
const apiClient = new AxiosHelper(BaseURL);

export const viewPaymentResult = async (orderCode) => {
  try {
    const response = await apiClient.get("/payos", { orderCode });

    return response;
  } catch (error) {
    throw error;
  }
};
