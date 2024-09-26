import AxiosHelper from "../AxiosHelper";

const BaseURL = import.meta.env.VITE_SERVER_URL;
const apiClient = new AxiosHelper(BaseURL);

export const filterSearchFashionItem = async (
    pageIndex = 1,
    sizeIndex = 10,
    searchValue,
    category,
    fitpreferences,
    gendertarget,
    fashionstyle,
    preferredsize,
    preferredcolors,
    preferredmaterials,
    occasion,
    brand,
    minPrice,
    maxPrice,
    sortBy = "name_asc"
  ) => {
    const filterRequest =  {
        Category: category || [],
        FitType: fitpreferences || [],
        GenderTarget: gendertarget || [],
        FashionTrend: fashionstyle || [],
        Size: preferredsize || [],
        Color: preferredcolors || [],
        Material: preferredmaterials || [],
        Occasion: occasion || [],
        Brand: brand || [],
        MaxPrice: maxPrice || null,
        MinPrice: minPrice || null
    }
    
    const params = {
        pageIndex,
        sizeIndex,
        searchValue,
        sortBy,
    ...filterRequest, 
    }
    
    console.log(params);
    

    try {
      const response = await apiClient.get("/fashionitem/search", {
            pageIndex,
            sizeIndex,
            searchValue,
            sortBy,
            ...filterRequest
        },
      );
  
      return response.data; // Return the data received from the API
    } catch (error) {
      console.error("Error fetching fashion items:", error); // Log the error for debugging
      throw error; // Re-throw the error for further handling
    }
  };