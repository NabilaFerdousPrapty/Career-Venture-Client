import React from 'react';
import { useLoaderData } from 'react-router-dom';

const BootCampDetails = () => {
     const bootCampDetails = useLoaderData();
    console.log(bootCampDetails);
    return (
        <div>
            
        </div>
    );
};

export default BootCampDetails;