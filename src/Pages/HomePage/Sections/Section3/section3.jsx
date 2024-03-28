import React, { useState, useEffect } from 'react';
import axios from 'axios';


function SectionThree() {
const [sectionThree, setSectionThree] = useState({});

useEffect(() => {
const fetchSectionThree = async () => {
try {
const response = await axios.get('https://app.kyveli.me/api/sectionthree');
console.log('Fetched Data:', response.data.data);
setSectionThree(response.data.data);
} catch (error) {
console.error('Error fetching data:', error);
}
};
fetchSectionThree();
}, []);

const handleItemClick = (id) => {
    window.location.href = `/products/${id}`;
};
return (
    <div className="sectionone">
        <div className="">
            {sectionThree && (
            <div className='section1-image-name'>
                <a onClick={() => handleItemClick(sectionThree.id)} className='a-sections'>
                <p className='section1-name'>{sectionThree.name}</p>
                <img src={sectionThree.image} alt={sectionThree.name} className='section1-image' />
                </a>
            </div>
            )}
        </div>
    </div>
);
}

export default SectionThree;
