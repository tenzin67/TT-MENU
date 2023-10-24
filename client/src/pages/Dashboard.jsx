import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
const Dashboard = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [des, setDes] = useState("");
  const [photo, setPhoto] = useState(null);
  const [foodlist, setFoodList] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("des", des);
    formData.append("photo", photo);

    try {
      const response = await axios.post("http://localhost:3500/addfood", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setName("");
        setPrice("");
        setDes("");
        setPhoto(null);
        fetchFoodList();
      } else {
        setError("Failed to add food item.");
      }
    } catch (error) {
      setError("Error: " + error.message);
    }
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

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
      <form
        id="foodForm"
        name="foodForm"
        onSubmit={handleSubmit}
        className="flex justify-center flex-col items-center"
        encType="multipart/form-data"
      >
        <h1 className="font-bold text-3xl">DASHBOARD</h1>
        <input
          type="text"
          id="foods"
          name="foodnames"
          placeholder="Food Name"
          className="border m-5 w-96 rounded-2xl p-3 border-gray-700"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Food Price"
          className="border m-5 w-96 rounded-2xl p-3 border-gray-700"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <textarea
          name="des"
          cols="33"
          rows="8"
          placeholder="Description"
          className="border m-5 rounded-2xl p-5 border-gray-700"
          value={des}
          onChange={(e) => setDes(e.target.value)}
        />
        <input
          type="file"
          placeholder="Food Photo"
          className="border m-5 w-96 rounded-2xl p-3 border-gray-700"
          name="photo"
          onChange={handleFileChange}
        />
        <button
          className="border w-32 h-10 bg-orange-500 rounded-xl border-gray-700"
          type="submit"
        >
          ADD
        </button>
        {error && <p>{error}</p>}
      </form>
       <ul className="2xl:flex flex-row flex-wrap gap-5">
        {foodlist.map((item) => (
          <li key={item._id} className="border border-gray-500 lg:w-[500px] font-mono bg-gray-600 text-gray-50 flex flex-col mt-10 mx-auto"> 
          <div className="m-2">
          <img src={`http://localhost:3500/${item.foodphoto}`} alt={item.foodphotos} className="w-[650px] h-60 rounded-lg"/>
          </div>
            <p>{item.foodname}</p>
            <p>RS-{item.foodprice}</p>
            <p>{item.fooddes}</p>
            <button
              className="p-1 bg-orange-600 rounded-md m-2"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </button>
          </li>
          
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
