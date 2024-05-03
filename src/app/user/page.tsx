// pages/index.tsx
"use client";
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

const API_URL = "http://localhost:3000/api/items";

interface Item {
  country: string;
  currency: string;
  site: string;
}

export default function Home() {
  const [items, setItems] = useState<any>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    fetchData();
    console.log(items);
  }, []);

  const fetchData = async () => {
    //  const options: AxiosRequest = {
    //    method: "GET",
    //    url: "https://sky-scanner3.p.rapidapi.com/get-config?limit=10",
    //    headers: {
    //      "X-RapidAPI-Key": "e53c431176mshf49fe0a26c89b09p15300fjsn7041c0323132",
    //      "X-RapidAPI-Host": "sky-scanner3.p.rapidapi.com",
    //    },
    //  };
    try {
      const response: AxiosResponse<Item[]> = await axios.get(
        "https://sky-scanner3.p.rapidapi.com/get-config?limit=10",
        {
          headers: {
            "X-RapidAPI-Key":
              "e53c431176mshf49fe0a26c89b09p15300fjsn7041c0323132",
            "X-RapidAPI-Host": "sky-scanner3.p.rapidapi.com",
          },
        }
      );
      console.log(response.data);
      const res = JSON.stringify(response.data);
      setItems(res);
      console.log(items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newItem = { name, description };
      await axios.post(API_URL, newItem);
      fetchData();
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  // const handleDelete = async (id: number) => {
  //   try {
  //     await axios.delete(`${API_URL}/${id}`);
  //     fetchData();
  //   } catch (error) {
  //     console.error("Error deleting item:", error);
  //   }
  // };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Items</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border border-gray-300 rounded mr-2 px-4 py-2"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border border-gray-300 rounded mr-2 px-4 py-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Item
        </button>
      </form>
      {/* <ul>
        {items.length > 0 &&
          items.map((item, index) => (
            <li key={index} className="mb-2">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">{item.country}</h2>
                  <p>{item.site}</p>
                </div>
                <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500"
              >
                Delete
              </button>
              </div>
            </li>
          ))}
      </ul> */}
    </div>
  );
}
