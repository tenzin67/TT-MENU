import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';

const LandingPage = () => {
  const [foodlist, setFoodList] = useState([]);
  const [error, setError] = useState(null);

  const handleDelete = (itemId) => {
    axios
      .delete(`http://localhost:3500/deletefood/${itemId}`)
      .then((response) => {
        if (response.status === 200) {
          setFoodList((prevFoodList) =>
            prevFoodList.filter((item) => item._id !== itemId)
          );
        } else {
          setError("Failed to delete food item.");
        }
      })
      .catch((error) => {
        setError("Error deleting item: " + error.message);
      });
  };

  useEffect(() => {
    fetchFoodList();
  }, []);

  const fetchFoodList = async () => {
    try {
      const response = await axios.get("http://localhost:3500/foodlist");
      setFoodList(response.data);
    } catch (error) {
      setError("Error fetching data: " + error.message);
    }
  };

  return (
    <div className="App">
      <h1 className="font-bold underline m-2 text-5xl">TT MENU</h1>
      <ul className=" flex 2xl:flex flex-row flex-wrap gap-3">
        {foodlist.map((item) => (
          <li key={item._id} className="border border-gray-500 h-60 w-60 bg-gray-700 text-white rounded-xl mt-10 mx-auto md:h-80 md:w-96"> 
          <div className="max-sm: w-[238px] rounded-t-xl md:w-[100%]">
          <img src={`http://localhost:3500/${item.foodphoto}`} alt={item.foodphotos} className="mx-auto h-36 w-64 rounded-t-xl md:w-[100%] md:h-56 "/>
          </div>
            <p className="m-3 text-xl text-orange-400 max-sm:relative left-2">{item.foodname}</p>
            {/* <p className="m-5">{item.fooddes}</p> */}
            <p className="m-3 text-sm  max-sm:relative  left-2">₹ {item.foodprice}</p>
          </li>
          
        ))}
      </ul>
      {error && <p>{error}</p>} 
    </div>
  );
};

export default LandingPage;
