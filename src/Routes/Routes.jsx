import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/signup/Signup";
import Bookservice from "../Pages/bookservice/Bookservice";
import Bookings from "../Pages/bokings/Bookings";
import Privaterout from "./privateroute/Privaterout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/signup',
                element: <Signup></Signup>,
            },
            {
                path: '/book/:id',
                element: <Privaterout>
                    <Bookservice></Bookservice>
                </Privaterout>,
                loader: ({ params }) => fetch(`http://localhost:4000/sirvices/${params.id}`)
            },
            {
                path: '/bookings',
                element: <Privaterout> <Bookings></Bookings></Privaterout>
            }
        ]
    },
]);
export default router