// FilterPage.js
import React from 'react';
import "../ProductPage/filterPage.css";

function FilterPage({ onClose, products }) {
    // Function to extract unique colors from products
    const extractUniqueColors = () => {
        const uniqueColors = new Set();
        if (Array.isArray(products)) {
            products.forEach(product => {
                if (product.variations && Array.isArray(product.variations)) {
                    product.variations.forEach(variation => {
                        if (variation.color) {
                            uniqueColors.add(variation.color);
                        }
                    });
                }
            });
        }
        return Array.from(uniqueColors);
    };

    const uniqueColors = extractUniqueColors();

    return (
        <div className="filter-page">
            <button className="close-button" onClick={onClose}>Close</button>
            <div>
                <h5>Select Color</h5>
                {uniqueColors.map((color, index) => (
                    <p className='products-color' key={index}>{color}</p>
                ))}
            </div>
        </div>
    );
}

export default FilterPage;
