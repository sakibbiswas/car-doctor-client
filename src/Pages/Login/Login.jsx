import React, { useContext } from 'react';
import login from '../../assets/images/login/login.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Authcontext } from '../../Providers/Authprovider';
const Login = () => {
    const { signIn } = useContext(Authcontext)
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'
    console.log(location);
    const Navigate = useNavigate()
    const handellogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                const loggeduser = {
                    email: user.email
                }
                console.log(loggeduser);
                // Navigate(from, { replace: true })
                fetch(`http://localhost:4000/jwt`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(loggeduser),
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('jwt response', data);
                        // warning : Local storage is not the best (second best place) to store the access token 
                        localStorage.setItem('car-access-token', data.token)
                        Navigate(from, { replace: true })
                    })
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
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <form onSubmit={handellogin} >
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

                                <input className="btn btn-primary" type="submit" value="login" />
                            </div>
                        </form>
                        <p className='my-4 text-center'>New to car doctor <Link className='text-orange-500 font-bold' to='/signup'>Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;