import React, {useState, useEffect} from 'react';
import "../ProductPage/filterPage.css";
import Slider from "@mui/material/Slider";

function FilterPage({ onClose, products, minPrice, maxPrice, applyFilters }) {
    const [activeIndices, setActiveIndices] = useState([]);
    const [range, setRange] = useState([minPrice, maxPrice]);
    const [selectedSizes, setSelectedSizes] = useState([]);

    const extractUniqueColors = () => {
        const uniqueColorsMap = new Map();
        if (Array.isArray(products)) {
            products.forEach(product => {
                if (product.variations && Array.isArray(product.variations)) {
                    product.variations.forEach(variation => {
                        if (variation.color) {
                            uniqueColorsMap.set(variation.color, variation.color_hex);
                        }
                    });
                }
            });
        }
        return Array.from(uniqueColorsMap, ([name, hex]) => ({ name, hex }));
    };
    const uniqueColors = extractUniqueColors();

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

    const handleClickSizes = (index) => {
        const indexExists = activeIndices.includes(index);
        if (indexExists) {
            setActiveIndices(activeIndices.filter((i) => i !== index));
        } else {
            setActiveIndices([...activeIndices, index]);
        }
    };

    const handleApplyFilters = () => {
        const filters = {
            sizes: selectedSizes.map((sizeIndex) => uniqueSizes[sizeIndex - 1]),
            min_price: range[0],
            max_price: range[1],
        };
        applyFilters(filters);
        onClose();
    };

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
                <button className='apply-filter' onClick={handleApplyFilters}> Apply Filters</button>
            </div>

            <div className='colors-div'>
                <h4>Select Color</h4>
                <div className='colors-columns'>
                {uniqueColors.map((color, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', breakInside: 'avoid-column' }}>
                        <p className='color-swatch' style={{ backgroundColor: color.hex }}></p>
                        <p className='products-color-name'>{color.name}</p>
                    </div>
                ))}
                </div>
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
                            onClick={() => {
                                handleClickSizes(index);
                                setSelectedSizes(activeIndices.map(index => index + 1)); //Updated selected sizes
                            }}
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
                    <Slider value={range} onChange={(_, newValue) => setRange(newValue)} valueLabelDisplay="auto"
                            className="price-slider" min={parseInt(minPrice)} max={parseInt(maxPrice)} />
                    <h4>{maxPrice}</h4>
                </div>
            </div>

        </div>
    );
}

export default FilterPage;
