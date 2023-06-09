import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import login from '../../assets/images/login/login.svg'
import { Authcontext } from '../../Providers/Authprovider';
import Sociallogin from '../shared/sociallogin/Sociallogin';
const Signup = () => {
    const { createuser, update } = useContext(Authcontext)
    const handelsignup = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        createuser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                loggeduser.displayName = name;
                loggeduser.photoURL = photo;
                update(name, photo)
                    .then(console.log('profile updated'))
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="mr-12 w-1/2">

                    <img src={login} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-5xl font-bold">Sign up</h1>
                        <form onSubmit={handelsignup} >
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="Your name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">

                                <input className="btn btn-primary" type="submit" value="signup" />
                            </div>
                        </form>
                        <p className='my-4 text-center'>Already have an account please <Link className='text-orange-500 font-bold' to='/login'>login</Link></p>
                        <Sociallogin></Sociallogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;