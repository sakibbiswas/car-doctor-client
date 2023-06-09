import React, { useEffect, useState } from 'react';

import Servicecard from './Servicecard';

const Services = () => {
    const [services, setservices] = useState([])
    const [asc, setase] = useState(true)
    useEffect(() => {
        fetch(`http://localhost:4000/sirvices?sort=${asc ? 'asc' : 'dsc'}`)
            .then(res => res.json())
            .then(data => setservices(data))
    }, [asc])
    return (
        <div className='mt-4'>
            <div className=" text-center space-y-2">
                <h2 className='text-xl font-bold text-orange-400'>Our services </h2>
                <h2 className='text-2xl font-semibold'>Our services area</h2>
                <p className=''>
                    the majority have suffered alteration in some form, by injected humour, or randomised words <br /> which don't look even slightly believable.
                </p>

                <button className="btn btn-info"
                    onClick={() => setase(!asc)}
                >{asc ? 'price high to low' : "price low to high"}</button>


            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10'>
                {
                    services.map(service => <Servicecard
                        key={service._id}
                        service={service}></Servicecard>)
                }
            </div>

        </div>
    );
};

export default Services;