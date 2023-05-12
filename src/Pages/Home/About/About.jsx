import React from 'react';
import person from '../../../assets/images/about_us/person.jpg'
import parts from '../../../assets/images/about_us/parts.jpg'
const About = () => {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">

                <div className="lg:w-1/2 relative">
                    <img src={person} className="w-3/4 rounded-lg  shadow-2xl" />
                    <img src={parts} className="w-1/2 rounded-lg border-8 border-white absolute right-4 top-1/2 shadow-2xl" />
                </div>
                <div className="lg:w-1/2 space-y-5 p-4">
                    <h1 className="text-2xl font-bold text-orange-400">About Us</h1>
                    <h2 className="py-6 text-5xl">We are qualified & of experience in this field</h2>
                    <p className="py-6 ">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                    <p className="py-6 ">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                    <button className="btn bg-orange-500">Get More Info</button>
                </div>
            </div>
        </div>
    );
};

export default About;