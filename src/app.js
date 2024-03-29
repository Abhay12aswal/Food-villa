import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header.js"; 
import Body  from "./components/Body.js";
import Footer from "./components/Footer.js";
import About from "./components/About.js";
import Error from "./components/Error.js";
import { createBrowserRouter ,RouterProvider , Outlet} from "react-router-dom";
import Contact from "./components/Contact.js";
import RestaurantMenu from "./components/RestaurantMenu.js";

const AppLayout = ()=>{
    return (
        <>
            <Header/>
            {/* { oulet } */}
            <Outlet/>
            <Footer/>
        </>
    )
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        errorElement:<Error/>,
        children: [
            {
                path:"/",
                element:<Body/>
            },
            {
                path:"/about",
                element: <About/>
            },
            {
                path:"/contact",
                element:<Contact/>
            },
            {
                path:"/restaurant/:resId",
                element:<RestaurantMenu/>
            }
        ]
    },
])



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);