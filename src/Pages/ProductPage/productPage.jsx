import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../ProductPage/productPage.css";
import FilterPage from './filterPage';

function ProductPage() {
const [productsData, setProductsData] = useState({});
const { categoryId } = useParams();
const [page, setPage] = useState(1);
const [loading, setLoading] = useState(false);
const [fetching, setFetching] = useState(false);
const [sort, setSort] = useState('date-new-to-old');
const [showFilter, setShowFilter] = useState(false);

const handleFilterClick = () => {
setShowFilter(true);
document.body.classList.add('no-scroll');
};

const handleCloseFilter = () => {
setShowFilter(false);
document.body.classList.remove('no-scroll');
};

useEffect(() => {
fetchProducts();
}, [categoryId, page, sort]);

const fetchProducts = async () => {
if (fetching) return;
setFetching(true);
setLoading(true);
try {
const response = await axios.get(`https://app.kyveli.me/api/products/${categoryId}?page=${page}&sort=${sort}`);
const newData = response.data.data;
if (page === 1) {
setProductsData({
products: newData.products,
product_count: newData.product_count,
subcategory: newData.subcategory
});
} else {
setProductsData(prevData => ({
...prevData,
products: [...prevData.products, ...newData.products],
product_count: newData.product_count,
subcategory: newData.subcategory
}));
}
} catch (error) {
console.error('Error fetching products:', error);
} finally {
setLoading(false);
setFetching(false);
}
};

const handleScroll = () => {
if (
window.innerHeight + document.documentElement.scrollTop ===
document.documentElement.offsetHeight
) {
setPage(prevPage => prevPage + 1);
}
};

useEffect(() => {
window.addEventListener('scroll', handleScroll);
return () => {
window.removeEventListener('scroll', handleScroll);
};
}, []);

const handleSortChange = (event) => {
setSort(event.target.value);
setPage(1);
};

return (
<div className='productPage'>

    <div className={`filter-overlay ${showFilter ? 'show' : '' }`}>
        <div className="filter-container">
        <FilterPage onClose={handleCloseFilter} products={productsData.products} />
        </div>
    </div>

    <div className='subcategory-count'>
        <p className='products-subcategory'>{productsData.subcategory} <span
                className='products-count'>{productsData.product_count} PRODUCTS</span></p>
        <div>
            <button className='products-filter-button' onClick={handleFilterClick}>FILTERS</button>
            <span className='sort-label'>SORT BY:</span>
            <select name="sort" id="sort" className='sort-select' onChange={handleSortChange} value={sort}>
                <option value="date-new-to-old">New To Old</option>
                <option value="date-old-to-new">Old To New</option>
                <option value="price-high-to-low">Price High To Low</option>
                <option value="price-low-to-high">Price Low To High</option>
            </select>
        </div>
    </div>

    <div className="product-container">
        {Array.isArray(productsData.products) && productsData.products.map((product, index) => (
        <div key={index}>
            <div>
                <div>
                    <img src={product.images[0]} className='products-img' alt={`Product ${index}`} />
                    <p className='products-websitename'>{product.website_name}</p>
                    <p className='products-price'>{product.price}$</p>
                </div>
            </div>
        </div>
        ))}
    </div>
    {loading && <p>Loading...</p>}
</div>
);
}

export default ProductPage;
