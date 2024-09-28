import AxiosHelper from "../AxiosHelper";

const BaseURL = import.meta.env.VITE_SERVER_URL;
const apiClient = new AxiosHelper(BaseURL);

export const filterSearchFashionItem = async (
    pageIndex,
    sizeIndex,
    searchValue,
    category = [""],
    fitPreferences = [""],
    genderTarget = [""],
    fashionStyle = [""],
    preferredSize = [""],
    preferredColors = [""],
    preferredMaterials = [""],
    occasion = [""],
    brand = [""],
    minPrice = null,
    maxPrice = null,
    sortBy = "name_asc"
  ) =>  {
    
    const filterRequest =  {
        Category: category.length > 0 ? category : [],
        FitType: fitPreferences.length > 0 ? fitPreferences : [],
        GenderTarget: genderTarget.length > 0 ? genderTarget : [],
        FashionTrend: fashionStyle.length > 0 ? fashionStyle : [],
        Size: preferredSize.length > 0 ? preferredSize : [],
        Color: preferredColors.length > 0 ? preferredColors : [],
        Material: preferredMaterials.length > 0 ? preferredMaterials : [],
        Occasion: occasion.length > 0 ? occasion : [],
        Brand: brand.length > 0 ? brand : [],
        MaxPrice: maxPrice || undefined,
        MinPrice: minPrice || undefined
    }
    
    const categoryParams = filterRequest.Category.map(cat => `Category=${encodeURIComponent(cat)}`).join('&');
    const fitTypeParams = filterRequest.FitType.map(ft => `FitType=${encodeURIComponent(ft)}`).join('&');
    const genderTargetParams = filterRequest.GenderTarget.map(gt => `GenderTarget=${encodeURIComponent(gt)}`).join('&');
    const fashionTrendParams = filterRequest.FashionTrend.map(ft => `FashionTrend=${encodeURIComponent(ft)}`).join('&');
    const sizeParams = filterRequest.Size.map(size => `Size=${encodeURIComponent(size)}`).join('&');
    const colorParams = filterRequest.Color.map(color => `Color=${encodeURIComponent(color)}`).join('&');
    const materialParams = filterRequest.Material.map(material => `Material=${encodeURIComponent(material)}`).join('&');
    const occasionParams = filterRequest.Occasion.map(occ => `Occasion=${encodeURIComponent(occ)}`).join('&');
    

    const queryParams = new URLSearchParams({
      pageIndex,
      sizeIndex,
      searchValue,
      sortBy
  }).toString();

  const url = `/fashionitem/search?${categoryParams}&${fitTypeParams}&${genderTargetParams}&${fashionTrendParams}&${sizeParams}&${colorParams}&${materialParams}&${occasionParams}&${queryParams}`;
  
    try {
      const response = await apiClient.get(url);
      // console.log(response.data);
  
      return response.data; // Return the data received from the API
    } catch (error) {
      console.error("Error fetching fashion items:", error); // Log the error for debugging
      throw error; // Re-throw the error for further handling
    }
  };