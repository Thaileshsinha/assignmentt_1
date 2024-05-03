"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  interface Item {
    country: string;
    currency: string;
    site: string;
  }
  const [responseData, setResponseData] = useState<Item[]>([]);
  const [country, setCountry] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");
  const [site, setSite] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: `https://sky-scanner3.p.rapidapi.com/get-config?limit=${10}&page=${1}`,
      headers: {
        "X-RapidAPI-Key": "11df4b4251msh5485e1a87682e4bp169b70jsn4a85b2c97423",
        "X-RapidAPI-Host": "sky-scanner3.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setResponseData(response.data.data.slice(0, 11));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create a new item object
    const newItem: Item = {
      country: country,
      currency: currency,
      site: site,
    };
    setResponseData((prevData) => [newItem, ...prevData]);
    setCountry("");
    setCurrency("");
    setSite("");
  };

  const handleUpdate = (item: Item) => {
    setSelectedItem(item);
    setCountry(item.country);
    setCurrency(item.currency);
    setSite(item.site);
  };

  const updateItem = () => {
    const updatedData = responseData.map((item) =>
      item.country === selectedItem?.country
        ? { ...item, country, currency, site }
        : item
    );
    setResponseData(updatedData);
    setSelectedItem(null);
    setCountry("");
    setCurrency("");
    setSite("");
  };

  const handleDelete = async (country: string) => {
    const deleteByCountry = responseData.filter((e) => e.country !== country);
    setResponseData(deleteByCountry);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto p-4">
        {!selectedItem && (
          <>
            <h1 className="text-3xl font-bold mb-4">Items</h1>

            <form
              onSubmit={handleSubmit}
              className="mb-4 flex flex-col sm:flex-row"
            >
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
                className="border border-gray-300 rounded mr-2 mb-2 sm:mb-0 px-4 py-2"
              />
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                placeholder="Currency"
                className="border border-gray-300 rounded mr-2 mb-2 sm:mb-0 px-4 py-2"
              />
              <input
                type="text"
                value={site}
                onChange={(e) => setSite(e.target.value)}
                placeholder="Site Link"
                className="border border-gray-300 rounded mr-2 mb-2 sm:mb-0 px-4 py-2"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Item
              </button>
            </form>
          </>
        )}
        {selectedItem && (
          // <div className="bg-gray-100 rounded-md p-4 mb-2">
          <>
            <h1 className="text-3xl font-bold mb-4">Update</h1>

            <form
              onSubmit={updateItem}
              className="mb-4 flex flex-col sm:flex-row"
            >
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
                className="border border-gray-300 rounded mr-2 mb-2 sm:mb-0 px-4 py-2"
              />
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                placeholder="Currency"
                className="border border-gray-300 rounded mr-2 mb-2 sm:mb-0 px-4 py-2"
              />
              <input
                type="text"
                value={site}
                onChange={(e) => setSite(e.target.value)}
                placeholder="Site Link"
                className="border border-gray-300 rounded mr-2 mb-2 sm:mb-0 px-4 py-2"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update Item
              </button>
            </form>
            {/* </div> */}
          </>
        )}
        {responseData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-100 rounded-md p-4 mb-2"
          >
            <div>
              <p className="font-semibold">{item.country}</p>
              <p className="text-gray-500">{item.site}</p>
            </div>
            <p className="font-semibold">{item.currency}</p>
            <div>
              <button
                onClick={() => handleUpdate(item)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(item.country)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
