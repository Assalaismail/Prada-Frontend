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


return (
    <div className="sectionone">
        <div className="">
            {sectionThree && (
            <div className='section1-image-name'>
                <p className='section1-name'>{sectionThree.name}</p>
                <img src={sectionThree.image} alt={sectionThree.name} className='section1-image' />
            </div>
            )}
        </div>
    </div>
);
}

export default SectionThree;
