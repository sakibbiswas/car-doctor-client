import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/shared/Footer/Footer';
import Navigationbar from '../Pages/shared/navbar/Navigationbar';

const Main = () => {
    return (
        <div>
            <Navigationbar></Navigationbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;