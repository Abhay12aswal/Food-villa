import { useEffect, useState } from "react";
import Logo from "../assets/img/foodvilla.png";
import { Link } from "react-router-dom";

const loggedUser= ()=>{
    //api call to check authentication
    return true;

}

//SPA - single page application
//client side routing and server side routing 

const Title = () => (
    <a href="/">
        <img 
        className="logo"
        alt="logo"
        src={Logo}
    /> 
    </a>
)

const Header = ()=>{

    const [isLoggedin , setIsLoggedin] = useState(false);

    useEffect(()=>{
        console.log("useeffect")
    },[])
    
    return (
        <div className="header">
            {<Title/>}

            <div className="nav-items">
                <ul>
                    <Link to={"/"}>
                        <li>Home</li>
                    </Link>
                    <Link to="/about">
                        <li>About</li>
                    </Link>
                    <Link to={"/contact"}>
                    <li>Contact</li>
                    </Link>
                    <li>Cart</li>
                </ul>
            </div>
            {
                isLoggedin ? <button onClick={()=>{
                    setIsLoggedin(false)
                }}>Logout</button> 
                : 
                <button onClick={()=>{
                    setIsLoggedin(true)
                }}>Login</button>
            }
        </div>
    )
}


export default Header;