import React, {useState, useEffect} from 'react';
import "../ProductPage/filterPage.css";
import Slider from "@mui/material/Slider";


function FilterPage({ onClose, products, minPrice, maxPrice }) {


    const [activeIndices, setActiveIndices] = useState([]);
    const [range, setRange] = React.useState([minPrice, maxPrice]);


    // Extract unique Colors
    // Function to extract unique colors from products
    const extractUniqueColors = () => {
        const uniqueColorsMap = new Map(); // Using a Map to ensure uniqueness based on color name
        if (Array.isArray(products)) {
            products.forEach(product => {
                if (product.variations && Array.isArray(product.variations)) {
                    product.variations.forEach(variation => {
                        if (variation.color) {
                            // Store color name as key and hex value as value in the Map
                            uniqueColorsMap.set(variation.color, variation.color_hex);
                        }
                    });
                }
            });
        }
        // Convert Map to an array of objects with name and hex properties
        return Array.from(uniqueColorsMap, ([name, hex]) => ({ name, hex }));
    };
        const uniqueColors = extractUniqueColors();

    // Extract unique Sizes
    const extractUniqueSizes = () => {
        const uniqueSizes = new Set();
        if (Array.isArray(products)) {
            products.forEach(product => {
                if (product.variations && Array.isArray(product.variations)) {
                    product.variations.forEach(variation => {
                        if (variation.size) {
                            uniqueSizes.add(variation.size);
                        }
                    });
                }
            });
        }
        return Array.from(uniqueSizes);
    };
        const uniqueSizes = extractUniqueSizes();


    const handleClick = (index) => {
        const indexExists = activeIndices.includes(index);
        if (indexExists) {
            setActiveIndices(activeIndices.filter((i) => i !== index));
        } else {
            setActiveIndices([...activeIndices, index]);
        }
    };

    //Price Range
    useEffect(() => {
        setRange([minPrice, maxPrice]);
    }, [minPrice, maxPrice]);


    function handleChanges(event, newValue) {
       setRange(newValue);
    }

    return (
    <div className="filter-page">

        <div className='clear-apply-filters'>
            <button className='clear-filter' onClick={onClose}> Clear Filters </button>
            <button className='apply-filter'> Apply Filters</button>
        </div>

        <div className='colors-div'>
            <h4>Select Color</h4>
            {uniqueColors.map((color, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <div className='color-swatch' style={{ backgroundColor: color.hex }}></div>
                    <p className='products-color-name'>{color.name}</p>
                </div>
            ))}
        </div>

        <hr></hr>

        <div className='sizes-div'>
            <h4>Select Size</h4>
            <div className='sizes'>
                {uniqueSizes.map((size, index) => (
                <p
                    className={`products-size${activeIndices.includes(index) ? ' active' : ''}`}
                    tabIndex="0"
                    key={index}
                    onClick={() => handleClick(index)}
                >
                    {size}
                </p>
                ))}
            </div>
        </div>

        <hr></hr>

        <div className="price-div">
            <h4>Price</h4>
            <div className='price-slider-div'>
                <h4>{minPrice}</h4>
                <Slider value={range} onChange={handleChanges} valueLabelDisplay="auto" className="price-slider" min={parseInt(minPrice)} max={parseInt(maxPrice)} />
                <h4>{maxPrice}</h4>
            </div>
        </div>

    </div>
    );
}

export default FilterPage;
