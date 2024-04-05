import React, { useState, useRef, useEffect } from 'react';
import '../Navbar/navbar.css';
import logo from '../../Assets/logo_english.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
faSearch,
faUser,
faShoppingCart,
faBars,
faHeart,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Navbar() {
const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
const [showSubcategory, setShowSubcategory] = useState(null);
const isMouseOver = useRef(false);
const subcategoryTimer = useRef(null);
const [categories, setCategories] = useState([]);


useEffect(() => {
const fetchData = async () => {
try {
const response = await axios.get('https://app.kyveli.me/api/category');
setCategories(response.data.data);
} catch (error) {
console.error('Error fetching data:', error);
}
};
fetchData();
}, []);

const toggleMobileMenu = () => {
setMobileMenuOpen(!isMobileMenuOpen);
};

const handleMouseEnter = (category) => {
isMouseOver.current = true;
setShowSubcategory(category);
};

const handleMouseLeave = () => {
isMouseOver.current = false;
subcategoryTimer.current = setTimeout(() => {
if (!isMouseOver.current) {
setShowSubcategory(null);
}
}, 200);
};

const handleSubcategoryClick = async (subcategory) => {
try {
const response = await axios.get(
`https://app.kyveli.me/api/products/${subcategory.id}`
);

window.location.href = `/products/${subcategory.id}`;

} catch (error) {
console.error('Error fetching products:', error);
}
};

return (
<div className='nav'>
    <div className="navbar">
        <a href="/">

            <img src={logo} alt="logo" className="logo"></img>
        </a>
        <div className="navbar-content">
            <ul className={`categories ${isMobileMenuOpen ? 'mobile-menu-open' : '' }`}>
                {categories.map((category) => (
                <li key={category.id} className="category-subcategory" onMouseEnter={()=>
                    handleMouseEnter(category.name)}
                    onMouseLeave={handleMouseLeave}
                    >
                    <span>{category.name}</span>

                    {showSubcategory === category.name && category.subcategories && (
                    <div className={`subcategory-container ${isMobileMenuOpen ? 'mobile-menu-open' : '' }`}>
                        {category.subcategories.map((subcategory) => (
                        <div key={subcategory.id} className='subcategory-name' onClick={()=>
                            handleSubcategoryClick(subcategory)}
                            >
                            <p className='sub-name'>{subcategory.name}</p>
                        </div>
                        ))}
                    </div>
                    )}
                </li>
                ))}
            </ul>
        </div>

        <div className="icons">
            <i className="icon">
                <FontAwesomeIcon icon={faSearch} />
            </i>
            <Link to="/login">
            <i className="icon">
                <FontAwesomeIcon icon={faUser} className='user' />
            </i>
            </Link>

            <i className="icon">
                <FontAwesomeIcon icon={faHeart} />
            </i>
            <i className="icon">
                <FontAwesomeIcon icon={faShoppingCart} />
            </i>
            <i className="menu-icon" onClick={toggleMobileMenu}>
                <FontAwesomeIcon icon={faBars} />
            </i>
        </div>

    </div>
</div>
);
}

export default Navbar;
