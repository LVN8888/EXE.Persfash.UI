import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Input, Button, Checkbox, Collapse, Spin, message, Pagination } from "antd";
import { filterSearchFashionItem } from "../../../services/FashionItemApi";
// import { searchProducts } from "../../../../services/SearchApi"; // Example service

const { Search } = Input;
const { Panel } = Collapse;


const fashionStyleOptions = [
  { label: 'Casual', value: 'Casual' },
  { label: 'Vintage', value: 'Vintage' },
  { label: 'Formal', value: 'Formal' },
  { label: 'Streetwear', value: 'Streetwear' },
  { label: 'Bohemian', value: 'Bohemian' },
  { label: 'Luxury', value: 'Luxury' },
  { label: 'Sporty', value: 'Sporty' },
  { label: 'Trendy', value: 'Trendy' },
  { label: 'Chic', value: 'Chic' },
];

const fitPreferencesOptions = [
  { label: 'Loose', value: 'Loose' },
  { label: 'Slim', value: 'Slim' },
  { label: 'Regular', value: 'Regular' },
  { label: 'Tight', value: 'Tight' },
];

const preferredSizeOptions = [
  { label: 'XS', value: 'XS' },
  { label: 'S', value: 'S' },
  { label: 'M', value: 'M' },
  { label: 'L', value: 'L' },
  { label: 'XL', value: 'XL' },
  { label: 'XXL', value: 'XXL' },
  { label: '36', value: '36' },
  { label: '37', value: '37' },
  { label: '38', value: '38' },
  { label: '39', value: '39' },
  { label: '40', value: '40' },
  { label: '41', value: '41' },
  { label: '42', value: '42' },
  { label: '43', value: '43' },
  { label: '44', value: '44' },
  { label: 'One Size', value: 'One Size' },
];

const preferredColorsOptions = [
  { label: 'Red', value: 'Red' },
  { label: 'Orange', value: 'Orange' },
  { label: 'Yellow', value: 'Yellow' },
  { label: 'Green', value: 'Green' },
  { label: 'Blue', value: 'Blue' },
  { label: 'Purple', value: 'Purple' },
  { label: 'Pink', value: 'Pink' },
  { label: 'Brown', value: 'Brown' },
  { label: 'Gray', value: 'Gray' },
  { label: 'Black', value: 'Black' },
  { label: 'White', value: 'White' },
];

const preferredMaterialsOptions = [
  { label: 'Cotton', value: 'Cotton' },
  { label: 'Kaki', value: 'Kaki' },
  { label: 'Polyester', value: 'Polyester' },
  { label: 'Silk', value: 'Silk' },
  { label: 'Denim', value: 'Denim' },
  { label: 'Wool', value: 'Wool' },
  { label: 'Mesh', value: 'Mesh' },
  { label: 'Leather', value: 'Leather' },
  { label: 'Linen', value: 'Linen' },
  { label: 'Nylon', value: 'Nylon' },
  { label: 'Corduroy', value: 'Corduroy' },
  { label: 'Rubber', value: 'Rubber' },
  { label: 'Canvas', value: 'Canvas' },
  { label: 'Metal', value: 'Metal' },
  { label: 'Plastic', value: 'Plastic' },
];

const occasionOptions = [
  { label: 'Business', value: 'Business' },
  { label: 'Party', value: 'Party' },
  { label: 'Wedding', value: 'Wedding' },
  { label: 'Casual', value: 'Casual' },
  { label: 'Formal', value: 'Formal' },
  { label: 'Sport', value: 'Sport' },
  { label: 'Vacation', value: 'Vacation' },
];

const genderTargetOptions = [
    {label: 'Men', value: 'Men' },
    {label: 'Women', value: 'Women' },
    {label: 'Unisex', value: 'Unisex' }
]

const categoryOptions = [
    {label: 'Tops', value: 'Tops' },
    {label: 'Bottoms', value: 'Bottoms' },
    {label: 'Accessories', value: 'Accessories' },
    {label: 'Shoes', value: 'Shoes' },
    {label: 'Dresses', value: 'Dresses' }
]

export const SearchResult = () => {
    const location = useLocation();
    const [searchValue, setSearchValue] = useState(location.state?.query || "");
    const [searchResults, setSearchResults] = useState([]);

    const [genderTarget, setGenderTarget] = useState([]);
    const [category, setCategory] = useState([]);
    const [fashionStyle, setFashionStyle] = useState([]);
    const [fitPreferences, setFitPreferences] = useState([]);
    const [preferredSize, setPreferredSize] = useState([]);
    const [preferredColors, setPreferredColors] = useState([]);
    const [preferredMaterials, setPreferredMaterials] = useState([]);
    const [occasion, setOccasion] = useState([]);

    const [loading, setLoading] = useState(false);
  

    //Pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(1);
    const pageSize = 10; // Set the page size

    useEffect(() => {
      // if (searchValue) {
        handleSearch(currentPage, true);
      // }
    }, [currentPage]);
  
    const handleSearchInputChange = (e) => {
        setSearchValue(e.target.value);
    };
  
    const handleFilterChange = (filterType, selectedValues) => {
      setFilters({
        ...filters,
        [filterType]: selectedValues,
      });
    };
  
    const handleSearch = async (page = 1, isPageChange = false) => {
      setLoading(true);
      try {
        // Simulate an API call
        // console.log("Filters being applied:", category);
        
        const response = await filterSearchFashionItem(
            page,
            pageSize,
            searchValue,
            category,
            fitPreferences,
            genderTarget,
            fashionStyle,
            preferredSize,
            preferredColors,
            preferredMaterials,
            occasion,
            [],
            null,
            null,
            "name_asc"
        ); 

        // console.log(filters.fitpreferences);
        
        // console.log(response);
        
        setSearchResults(response.data);

        setTotalItems(response.totalItems);

        // reset page về 1 khi apply search
         // kiểm tra is page changed để bt ng dùng có ấn search ko search thì về 1, ko thì đang chuyển trang ko fetch lại api search
        if (!isPageChange) {
          setCurrentPage(1) 
        }

      } catch (error) {
        console.error("Error searching:", error);
      } finally {
        setLoading(false);
      }
    };

    const handleSearchSubmit = () => {
      handleSearch(1, false);
    }

    const onPageChange = (page) => {
      setCurrentPage(page);
    };

    return (
      <div className="p-6 dark:bg-gradient-to-tr dark:from-[#7979c9] dark:to-[#4949e9]">
        {/* Search Menu */}
        <div className="flex flex-col items-center">
          <Search
            placeholder="Search for products..."
            onChange={handleSearchInputChange}
            value={searchValue}
            onSearch={() => handleSearchSubmit()}
            style={{ width: 400 }}
            enterButton={
              <Button
                style={{ backgroundColor: "#4949E9", color: "#fff" }}
                // disabled={!searchValue.trim()}
              >
                Search
              </Button>
            }
            loading={loading} // Adding Ant Design's loading spinner
          />
        </div>

        <Collapse className="mt-6" ghost>
          <Panel
            header="Filters"
            key="1"
            className="bg-white rounded-sm shadow-sm font-medium"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
              {/* Category Filter */}
              <div className="border rounded-md p-3 hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-bold mb-2 text-gray-800">Category</h3>
                <Checkbox.Group
                  options={categoryOptions}
                  onChange={(values) => setCategory(values)}
                />
              </div>

              {/* Gender Target Filter */}
              <div className="border rounded-md p-3 hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-bold mb-2 text-gray-800">Gender Target</h3>
                <Checkbox.Group
                  options={genderTargetOptions}
                  onChange={(values) => setGenderTarget(values)}
                />
              </div>

              {/* Fashion Style Filter */}
              <div className="border rounded-md p-3 hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-bold mb-2 text-gray-800">Fashion Style</h3>
                <Checkbox.Group
                  options={fashionStyleOptions}
                  onChange={(values) => setFashionStyle(values)}
                />
              </div>

              {/* Fit Preferences Filter */}
              <div className="border rounded-md p-3 hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-bold mb-2 text-gray-800">
                  Fit Preferences
                </h3>
                <Checkbox.Group
                  options={fitPreferencesOptions}
                  onChange={(values) => setFitPreferences(values)}
                />
              </div>

              {/* Preferred Size Filter */}
              <div className="border rounded-md p-3 hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-bold mb-2 text-gray-800">Preferred Size</h3>
                <Checkbox.Group
                  options={preferredSizeOptions}
                  onChange={(values) => setPreferredSize(values)}
                />
              </div>

              {/* Preferred Colors Filter */}
              <div className="border rounded-md p-3 hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-bold mb-2 text-gray-800">
                  Preferred Colors
                </h3>
                <Checkbox.Group
                  options={preferredColorsOptions}
                  onChange={(values) => setPreferredColors(values)}
                />
              </div>

              {/* Preferred Materials Filter */}
              <div className="border rounded-md p-3 hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-bold mb-2 text-gray-800">
                  Preferred Materials
                </h3>
                <Checkbox.Group
                  options={preferredMaterialsOptions}
                  onChange={(values) => setPreferredMaterials(values)}
                />
              </div>

              {/* Occasion Filter */}
              <div className="border rounded-md p-3 hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-bold mb-2 text-gray-800">Occasion</h3>
                <Checkbox.Group
                  options={occasionOptions}
                  onChange={(values) => setOccasion(values)}
                />
              </div>
            </div>
          </Panel>
        </Collapse>

        {/* Search Results */}
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow mt-6">
            {loading ? (
              <Spin size="large" />
            ) : searchResults.length > 0 ? (
              <>
                {/* Render search results */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="border rounded-lg shadow hover:shadow-lg transition-shadow duration-300 dark:border-[#7979c9]"
                    >
                      <img
                        src={result.thumbnailURL}
                        alt={result.itemName}
                        className="w-full h-[410px] object-cover rounded-md object-top"
                      />
                      <h3 className="font-medium text-center text-lg mt-1 font-avantgarde text-[#4949e9] dark:text-white">
                        {result.itemName}
                      </h3>
                    </div>
                  ))}
                </div>
                {/* Pagination */}
                <Pagination
                  className="mt-4 font-medium"
                  current={currentPage}
                  pageSize={pageSize}
                  total={totalItems}
                  onChange={onPageChange}
                />
              </>
            ) : (
              <p className="font-medium font-avantgarde ml-4 text-3xl text-center">No results found</p>
            )}
          </div>
        </div>
      </div>
    );
};
