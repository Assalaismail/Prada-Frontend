import React, {useState, useEffect} from 'react';
import "../ProductPage/filterPage.css";
import Slider from "@mui/material/Slider";

function FilterPage({ onClose, colors, sizes, minPrice, maxPrice, applyFilters }) {
    const [activeIndices, setActiveIndices] = useState([]);
    const [range, setRange] = useState([minPrice, maxPrice]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedCount, setSelectedCount] = useState(0);

    const [activeColorIndices, setActiveColorIndices] = useState([]);
    const [selectedColorCount, setSelectedColorCount] = useState(0);


    const handleClickColors = (index) => {
        const indexExists = activeColorIndices.includes(index);
        if (indexExists) {
            setActiveColorIndices(activeColorIndices.filter((i) => i !== index));
            setSelectedColorCount(selectedColorCount - 1);
        } else {
            setActiveColorIndices([...activeColorIndices, index]);
            setSelectedColorCount(selectedColorCount + 1);
        }
    };

    const handleClickSizes = (index) => {
        const indexExists = activeIndices.includes(index);
        if (indexExists) {
            setActiveIndices(activeIndices.filter((i) => i !== index));
            setSelectedCount(selectedCount - 1);
        } else {
            setActiveIndices([...activeIndices, index]);
            setSelectedCount(selectedCount + 1);
        }
    };





    const handleApplyFilters = () => {
        const filters = {
            sizes: sizes.map((sizeIndex) => sizes[sizeIndex - 1]),
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
                <h4>Select Color <span className='selected-count'>{selectedColorCount}</span></h4>
                <div className='colors-columns'>
                    {colors?.map((color, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', breakInside: 'avoid-column' }} >
                        <p
                            className={`color-swatch${activeColorIndices.includes(index) ? ' selected' : ''}`}
                            style={{ backgroundColor: color.color_hex }}
                            onClick={() => handleClickColors(index)}
                        >
                        </p>
                        <p className='products-color-name' onClick={() => handleClickColors(index)}>{color.color_title} </p>

                        {activeColorIndices.includes(index) && <span className="selected-symbol">&#10003;</span>}

                    </div>
                ))}
                </div>
            </div>

            <hr></hr>

            <div className='sizes-div'>
                <h4>Select Size <span className='selected-count'>{selectedCount}</span></h4>
                <div className='sizes'>
                    {sizes?.map((size, index) => (
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
