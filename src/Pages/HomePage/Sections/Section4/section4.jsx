import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Section2/section2.css';

function SectionFour() {
    const [sectionFour, setSectionFour] = useState([]);

    useEffect(() => {
        const fetchSectionFour = async () => {
            try {
                const response = await axios.get('https://app.kyveli.me/api/sectionfour');
                console.log('Fetched Data:', response.data.data);
                setSectionFour(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchSectionFour();
    }, []);


    return (
    <div className="sectiontwo">
        {Array.isArray(sectionFour) && sectionFour.map((item, index) => (
            <div className='sectiontwo-image-name' key={index}>
                <img src={item.image} alt={item.name} className='sectiontwo-image' />
                <p className='sectiontwo-name'>{item.name}</p>

            </div>
        ))}
    </div>
    );
}

export default SectionFour;
