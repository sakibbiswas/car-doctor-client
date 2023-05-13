import React, { useContext, useEffect, useState } from 'react';
import { Authcontext } from '../../Providers/Authprovider';
import Bookingrow from './Bookingrow';
import Swal from 'sweetalert2';
import { Container } from 'postcss';

const Bookings = () => {
    const { user } = useContext(Authcontext)
    const [bookings, setbookings] = useState([])
    const url = `http://localhost:4000/bookings/?email=${user?.email}`

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setbookings(data))
    }, [url])

    const handeldelete = id => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:4000/bookings/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your boking has been deleted.',
                                'success'
                            )
                            const remaining = bookings.filter(bok => bok._id !== id)
                            setbookings(remaining)
                        }
                    })
            }
        })
    }

    const handelUpdate = id => {
        // send data to server
        fetch(`http://localhost:4000/bookings/${id}`, {
            method: "PUT", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: 'confirm' }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'success',
                        text: 'Booking updated successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                    // updatestate
                    const remaining = bookings.filter(bok => bok._id !== id)
                    const updated = bookings.find(bok => bok._id !== id)
                    updated.status = 'confirm'
                    const Newbooking = [updated, ...remaining]
                    setbookings(Newbooking)
                }
            })

    }

    return (
        <div >
            <h2>bokking : {bookings.length}</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <th>

                    </th>
                    <th>image</th>
                    <th>Service</th>
                    <th>date</th>
                    <th>price</th>
                    <th>status</th>



                    {
                        bookings.map(booking => <Bookingrow
                            key={booking._id}
                            booking={booking}
                            handeldelete={handeldelete}
                            handelUpdate={handelUpdate}
                        >

                        </Bookingrow>)
                    }





                </table >
            </div >
        </div >
    );
};

export default Bookings;