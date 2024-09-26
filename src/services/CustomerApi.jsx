import AxiosHelper from "../AxiosHelper";

const BaseURL = import.meta.env.VITE_SERVER_URL;
const apiClient = new AxiosHelper(BaseURL);

export const customerRegister = async (
  username,
  email,
  password,
  confirmPassword,
  fullName,
  gender,
  dateOfBirth
) => {
  try {
    const response = await apiClient.post("/customer/register", {
      username,
      email,
      password,
      confirmPassword,
      fullName,
      gender,
      dateOfBirth,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const viewCustomerInformation = async (customerId) => {
  try {
    const response = await apiClient.get(
      `/customer/information`, {customerId});
    return response;
  } catch (error) {
    throw error;
  }
};

export const viewCurrentUserInfo = async () => {
  try {
    const response = await apiClient.get(
      `/authentication/user-infor`, {}, {}, true);
    return response;
  }catch(error) {
    throw error;
  }
}

export const customerUpdateInformation = async (
  customerId,
  email,
  fullName,
  gender,
  dateOfBirth,
  profilePicture
) => {
  try {
    const response = await apiClient.put(
      "/customer/information",
      {
        customerId,
        email,
        fullName,
        gender,
        dateOfBirth,
        profilePicture
      },
      {},
      true
    );

    return response;
  } catch (error) {
    throw error;
  }
};

// kiểm tra customer đã thực hiện profile setup hay chưa
export const checkCustomerProfile = async () => {
  try {
    const response = await apiClient.get(
      "/customer/profile/checkprofile",
      {},
      {},
      true
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// lấy thông tin gói đăng ký hiện tại của customer
export const getCustomerCurrentSubscription = async () => {
  try {
    const response = await apiClient.get(
      "/customer/current-subscription",
      {},
      {},
      true
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const viewCustomerProfile = async () => {
  try {
    const response = await apiClient.get("/customer/profile", {}, {}, true);
    return response;
  } catch (error) {
    throw error;
  }
};

export const setupCustomerProfile = async (
  bodyType,
  fashionStyle,
  fitPreferences,
  preferredSize,
  preferredColors,
  preferredMaterials,
  occasion,
  lifestyle
) => {
  try {
    const response = await apiClient.post(
      "/customer/profile",
      {
        bodyType,
        fashionStyle,
        fitPreferences,
        preferredSize,
        preferredColors,
        preferredMaterials,
        occasion,
        lifestyle,
      },
      {},
      true
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateCustomerProfile = async (
  profileId,
  bodyType,
  fashionStyle,
  fitPreferences,
  preferredSize,
  preferredColors,
  preferredMaterials,
  occasion,
  lifestyle,
  facebookLink,
  instagramLink,
  tiktokLink
) => {
  try {
    const requestBody = {
      profileId,
      bodyType,
      fashionStyle,
      fitPreferences,
      preferredSize,
      preferredColors,
      preferredMaterials,
      occasion,
      lifestyle,
      facebookLink,
      instagramLink,
      tiktokLink
    };

    const response = await apiClient.put( "/customer/profile", requestBody ,{},true);
    return response;
  } catch (error) {
    throw error;
  }
};


export const viewCustomerItemRecommendation = async (page, size) => {
  try {
    const response = await apiClient.get("/customer/recommendation/fashion-item", {page, size}, {}, true);
    return response;
  } catch (error) {
    throw error;
  }
};