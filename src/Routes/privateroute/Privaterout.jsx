import React, { useContext } from 'react';
import { Authcontext } from '../../Providers/Authprovider';
import { Navigate } from 'react-router-dom';

const Privaterout = ({ children }) => {
    const { user, loading } = useContext(Authcontext)
    if (loading) {
        return <progress className="progress progress-error w-56" value="100" max="100"></progress>
    }
    if (user?.email) {
        return children
    }
    return <Navigate to='/login' replace='true'></Navigate>

};

export default Privaterout;