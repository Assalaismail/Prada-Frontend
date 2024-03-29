import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Section1/section1.css';

function SectionOne() {
    const [sectionOne, setSectionOne] = useState({});

    useEffect(() => {
        const fetchSectionOne = async () => {
            try {
                const response = await axios.get('https://app.kyveli.me/api/sectionone');
                console.log('Fetched Data:', response.data.data);
                setSectionOne(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchSectionOne();
    }, []);

    console.log('SectionOne state:', sectionOne);

    const handleItemClick = (id) => {
        window.location.href = `/products/${id}`;
    };

    return (
        <>
            <div className="sectionone">
                <div className="">
                    {sectionOne && (
                         <div className='section1-image-name'>
                             <a onClick={() => handleItemClick(sectionOne.id)} className='a-sections'>
                            <p className='section1-name'>{sectionOne.name}</p>
                            <img src={sectionOne.image} alt={sectionOne.name} className='section1-image' />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default SectionOne;
