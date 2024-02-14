import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Section2/section2.css';

function SectionTwo() {
    const [sectionTwo, setSectionTwo] = useState([]);

    useEffect(() => {
        const fetchSectionTwo = async () => {
            try {
                const response = await axios.get('https://app.kyveli.me/api/sectiontwo');
                console.log('Fetched Data:', response.data.data);
                setSectionTwo(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchSectionTwo();
    }, []);

    console.log('SectionTwo state:', sectionTwo);

    return (
        <>
    <div className="sectiontwo">
        {Array.isArray(sectionTwo) && sectionTwo.map((item, index) => (
            <div className='sectiontwo-image-name' key={index}>
                <img src={item.image} alt={item.name} className='sectiontwo-image' />
                <p className='sectiontwo-name'>{item.name}</p>

            </div>
        ))}
    </div>

        </>
    );
}

export default SectionTwo;
