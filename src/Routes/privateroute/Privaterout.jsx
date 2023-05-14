import React, { useContext } from 'react';
import { Authcontext } from '../../Providers/Authprovider';
import { Navigate, useLocation } from 'react-router-dom';

const Privaterout = ({ children }) => {
    const { user, loading } = useContext(Authcontext)
    const location = useLocation()
    if (loading) {
        return <progress className="progress progress-error w-56" value="100" max="100"></progress>
    }
    if (user?.email) {
        return children
    }
    return <Navigate state={{ from: location }} to='/login' replace></Navigate>;

};

export default Privaterout;