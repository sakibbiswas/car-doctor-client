import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Authcontext } from '../../Providers/Authprovider';

const Bookservice = () => {
    const service = useLoaderData()
    const { title, _id, price, img } = service
    const { user } = useContext(Authcontext)
    const handelsubmit = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = user?.email;
        const date = form.date.value;
        const booking = {
            customarname: name, email, date, img,
            service: title,
            service_id: _id,
            price: price
        }
        console.log(booking);

        fetch('https://car-doctor-server-orpin-ten.vercel.app/bookings', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(booking),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    alert('service book successfuly')
                }
            })
    }
    return (
        <div>
            <h2 className='text-3xl text-yellow-500 text-center'>Book services :{title}</h2>

            <form onSubmit={handelsubmit}>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name='name' placeholder="Name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" name='date' placeholder="Date" className="input input-bordered" required />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name='email' defaultValue={user?.email} className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due amount</span>
                        </label>
                        <input type="text" defaultValue={'$' + price} className="input input-bordered" required />

                    </div>
                </div>
                <div className="form-control mt-6">

                    <input className="btn btn-primary btn-block" type="submit" value="Order confirm" />
                </div>

            </form>
        </div>
    );
};

export default Bookservice;