import React, { useContext } from 'react';
import { Authcontext } from '../../../Providers/Authprovider';

const Sociallogin = () => {
    const { googleSignIN } = useContext(Authcontext)
    const handelgoogle = () => {
        googleSignIN()
            .then(result => {
                console.log(result.user);
            })
            .then(error => {
                console.log(error);
            })
    }
    return (
        <div>
            <div className="divider">OR</div>
            <div className='text-center'>

                <button onClick={handelgoogle} className="btn btn-circle btn-outline">
                    G
                </button>
            </div>
        </div>
    );
};

export default Sociallogin;