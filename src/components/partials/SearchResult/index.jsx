import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Input, Button, Checkbox, Collapse, Spin } from "antd";
import { filterSearchFashionItem } from "../../../services/FashionItemApi";
// import { searchProducts } from "../../../../services/SearchApi"; // Example service

const { Search } = Input;
const { Panel } = Collapse;


const fashionStyle = [
  { label: 'Casual', value: 'Casual' },
  { label: 'Vintage', value: 'Vintage' },
  { label: 'Formal', value: 'Formal' },
  { label: 'Streetwear', value: 'Streetwear' },
  { label: 'Bohemian', value: 'Bohemian' },
  { label: 'Luxury', value: 'Luxury' },
  { label: 'Sporty', value: 'Sporty' },
];

const fitPreferences = [
  { label: 'Loose', value: 'Loose' },
  { label: 'Slim', value: 'Slim' },
  { label: 'Regular', value: 'Regular' },
  { label: 'Tight', value: 'Tight' },
];

const preferredSize = [
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
];

const preferredColors = [
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

const preferredMaterials = [
  { label: 'Cotton', value: 'Cotton' },
  { label: 'Polyester', value: 'Polyester' },
  { label: 'Silk', value: 'Silk' },
  { label: 'Denim', value: 'Denim' },
  { label: 'Wool', value: 'Wool' },
  { label: 'Mesh', value: 'Mesh' },
  { label: 'Leather', value: 'Leather' },
];

const occasion = [
  { label: 'Business', value: 'Business' },
  { label: 'Party', value: 'Party' },
  { label: 'Wedding', value: 'Wedding' },
  { label: 'Casual', value: 'Casual' },
  { label: 'Formal', value: 'Formal' },
  { label: 'Sport', value: 'Sport' },
  { label: 'Vacation', value: 'Vacation' },
];

const genderTarget = [
    {label: 'Men', value: 'Men' },
    {label: 'Women', value: 'Women' },
    {label: 'Unisex', value: 'Unisex' }
]

const category = [
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
    const [filters, setFilters] = useState({
      gendertarget: [],
      category:[],
      fashionstyle: [],
      fitpreferences: [],
      preferredsize: [],
      preferredcolors: [],
      preferredmaterials: [],
      occasion: [],
    });
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      if (searchValue) {
        handleSearch();
      }
    }, []);
  
    const handleSearchInputChange = (e) => {
        setSearchValue(e.target.value);
    };
  
    const handleFilterChange = (filterType, selectedValues) => {
      setFilters({
        ...filters,
        [filterType]: selectedValues,
      });
    };
  
    const handleSearch = async () => {
      setLoading(true);
      try {
        // Simulate an API call
        console.log("Filters being applied:", filters);
        
        const response = await filterSearchFashionItem(
            1,
            10,
            searchValue,
            filters.category,
            filters.fitpreferences,
            filters.gendertarget,
            filters.fashionstyle,
            filters.preferredsize,
            filters.preferredcolors,
            filters.preferredmaterials,
            filters.occasion,
            null,
            null,
            null,
            "name_asc"
        ); 

        // console.log(filters.fitpreferences);
        
        console.log(response);
        
        setSearchResults(response);
      } catch (error) {
        console.error("Error searching:", error);
      } finally {
        setLoading(false);
      }
    };

    return (
        <div className="p-6">
          {/* Search Menu */}
          <div className="flex flex-col items-center">
            <Search
              placeholder="Search for products..."
              onChange={handleSearchInputChange}
              value={searchValue}
              onSearch={handleSearch}
              style={{ width: 400 }}
              enterButton={
                <Button style={{ backgroundColor: "#4949E9", color: "#fff" }}>
                  Search
                </Button>
              }
              loading={loading} // Adding Ant Design's loading spinner
            />
          </div>
      
          {/* Filter Menu */}
          {/* <Collapse className="mt-6" ghost>
            <Panel header="Filters" key="1" className="bg-white rounded-sm shadow-sm font-medium">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                {[
                  { title: "Category", options: category, key: 'category' },
                  { title: "Gender Target", options: genderTarget, key: 'gendertarget' },
                  { title: "Fashion Style", options: fashionStyle, key: 'fashionstyle' },
                  { title: "Fit Preferences", options: fitPreferences, key: 'fitpreferences' },
                  { title: "Preferred Size", options: preferredSize, key: 'preferredsize' },
                  { title: "Preferred Colors", options: preferredColors, key: 'preferredcolors' },
                  { title: "Preferred Materials", options: preferredMaterials, key: 'preferredmaterials' },
                  { title: "Occasion", options: occasion, key: 'occasion' },
                ].map((filter) => (
                  <div key={filter.title} className="border rounded-md p-3 hover:shadow-lg transition-shadow duration-300">
                    <h3 className="font-bold mb-2 text-gray-800">{filter.title}</h3>
                    <Checkbox.Group
                    options={filter.options}
                    onChange={(values) => handleFilterChange(filter.key, values)}
                        />
                  </div>
                ))}
              </div>
            </Panel>
          </Collapse> */}
      
          {/* Search Results */}
          <div className="flex flex-col min-h-screen">
            <div className="flex-grow mt-6">
              {loading ? (
                <Spin size="large" />
              ) : searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300"
                    >
                      <img
                        src={result.thumbnailURL}
                        alt={result.itemName}
                        className="w-full h-64 object-cover rounded-md"
                      />
                      <h3 className="font-bold text-lg mt-4">{result.title}</h3>
                      <p>{result.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No results found.</p>
              )}
            </div>
          </div>
        </div>
      );
};
