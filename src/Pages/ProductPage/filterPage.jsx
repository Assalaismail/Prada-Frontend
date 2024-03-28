import React from 'react';
import "../ProductPage/filterPage.css";

function FilterPage({ onClose, products }) {
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

    return (
        <div className="filter-page">
            <button className="close-button" onClick={onClose}>Close</button>
            <div>
                <h4>Select Color</h4>
                {uniqueColors.map((color, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                        <div className='color-swatch' style={{ backgroundColor: color.hex }}></div>
                        <p className='products-color-name'>{color.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FilterPage;
