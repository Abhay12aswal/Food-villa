import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../Constants";

const RestaurantMenu = ()=>{
    const {resId} = useParams();

    const [restaurant , setRestaurant] = useState({});

    useEffect(()=>{
        getRestaurantInfo();
    },[])

    async function getRestaurantInfo(){
        const data = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=29.74750&lng=78.52840&restaurantId=469954&catalog_qa=undefined&submitAction=ENTER");
        const json =await data.json();
        console.log(json);
        setRestaurant(json.restaurant);
    }
    

    return (
        <div>
            <h1>Restaurant id: {resId} </h1>
            <h2>{restaurant.name}</h2>
            <img src={IMG_CDN_URL + restaurant.cloudinaryImageId} />
            <h3>{restaurant.area}</h3>
            <h3>{restaurant.city}</h3>
            <h3>{restaurant.avgRating}</h3>
            <h3>{restaurant.costForTwoMsg}</h3>
        </div>
    )
};

export default RestaurantMenu;

