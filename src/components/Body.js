import { restaurantList } from "../Constants";
import RestaurantCard from "./RestaurantCard";
import {useState , useEffect} from "react";
import Shimmer from "./Shimmer";


function filterData(searchInput , restaurants){

  const filterData= restaurants.filter((restaurant)=>{
    restaurant?.data?.name?.toLowerCase()?.includes(searchInput.toLowerCase());
  })

  return filterData;
}

const Body = ()=>{
  //searchtxt is a local state variable


  const [allRestaurants , setAllRestaurnats] = useState([]);
  const [filteredrestaurants , setFilteredRestaurants]= useState([]);
  const [searchInput, setSearchInput] = useState("");  //To create state variable

 
  useEffect(()=>{
    //api call
    getRestaurants();
  },[])

  async function getRestaurants(){
    const data= await fetch(
"https://www.swiggy.com/dapi/restaurants/list/v5?lat=29.74750&lng=78.52840&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      //"https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.8779714&lng=75.3488766&page_type=DESKTOP_WEB_LISTING"
      );
    const json = await data.json();
    //optional chaining
    setAllRestaurnats(json?.data?.cards[2]?.data?.data?.cards);
    setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
  }



  //not render component (early return)
  if(!allRestaurants) return null;

  // if(filteredrestaurants?.length === 0) 
  // return <h1>NO restaurant match yout Filter!</h1>
  
  return (allRestaurants.length === 0) ? (<Shimmer/>) : 
  (
    <>
      <div className="search-container">
        <input 
        type="text" 
        className="search-input" 
        placeholder="Search"
        value={searchInput} 
        onChange={(e) => {
          setSearchInput(e.target.value)
        }}
        />
      

        <button className="search-btn"
        onClick={()=>{
          //need to filter the data
          const data= filterData(searchInput, allRestaurants);
          //update the state - restaurnats
          setFilteredRestaurants(data);
        }}
        >Search</button> 
      </div>

        <div className="restaurant-list">
        {
          filteredrestaurants.map((restaurant) =>{
            return <RestaurantCard {...restaurant.data} key={restaurant.data.id}/>
          })
        }
        </div>
    </>
  )
}

export default Body;

// import { useState, useEffect } from "react";
// import  restaurantList  from "../Constants";
// import RestaurantCard from "./RestaurantCard";
// import Shimmer from "./Shimmer";

// function filterData(searchText, restaurants) {
//   const filterdata = restaurants.filter((restaurant) =>
//     restaurant?.data?.name?.toLowerCase()?.includes(searchText.toLowerCase())
//   );
//   return filterdata;
// }

// const Body = () => {
//   // const searchText = "KFC";
//   const [allRestaurants, setAllRestaurants] = useState([]);
//   const [filteredrestaurants, setFilteredRestaurants] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   // to maintain the list of restaurant

//   useEffect(() => {
//     //API CAll
//     getRestaurants();
//     console.log("useEffect");
//   }, []);

//   async function getRestaurants() {
//     const data = await fetch(
//       "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.8779714&lng=75.3488766&page_type=DESKTOP_WEB_LISTING"
//     ); //this will return readable string will convert this readable stringto json
//     const json = await data.json();
//     setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
//     setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
//   }

//   console.log("render");

//   if (!allRestaurants) return null;

//   //conditional Rendering
//   // if restaurant is empty => Shimmer UI
//   // if data is there => actual data
//   return allRestaurants.length === 0 ? (
//     <Shimmer />
//   ) : (
//     <>
//       <div className="search-container">
//         <input
//           type="text"
//           className="search-input"
//           placeholder="Search"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//         />
//         <button
//           className="search-btn"
//           onClick={() => {
//             const data = filterData(searchText, allRestaurants);
//             setFilteredRestaurants(data);
//           }}
//         >
//           Search
//         </button>
//       </div>
//       <div className="restaurnant-list">
//         {filteredrestaurants.map((restaurant) => {
//           return <RestaurantCard {...restaurant.data} key={restaurant.data.id} />;
//         })}
//       </div>
//     </>
//   );
// };
// export default Body;
//   This file is names as Body.jsx beacause it's react file we can write .js no issues or if code in typescript we can write .tsx or .ts