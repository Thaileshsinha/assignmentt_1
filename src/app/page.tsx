"use client";
import app from "@/components/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "@firebase/firestore";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  interface Item {
    id: string;
    fullname: string;
    age: number;
    site: string;
  }
  const firestore = getFirestore(app);
  const [responseData, setResponseData] = useState<Item[]>([]);
  const [fullname, setFullname] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [site, setSite] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    fetchData();
    console.log(process.env.WEB_HOST);
  }, []);

  const fetchData = async () => {
    try {
      const collectionRef = collection(firestore, "user");
      const querySnapshot = await getDocs(collectionRef);
      console.log("check kr", querySnapshot);
      const items: Item[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        items.push({
          id: doc.id,
          fullname: data.fullname,
          age: data.age,
          site: data.site,
        });
      });
      setResponseData(items);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Create a new item object
    const newItem: any = {
      fullname: fullname,
      age: age,
      site: site,
    };
    const x = await addDoc(collection(firestore, "user"), newItem);

    setResponseData((prevData) => [newItem, ...prevData]);
    setFullname("");
    setAge(0);
    setSite("");
  };

  const handleUpdate = (item: Item) => {
    setSelectedItem(item);
    setFullname(item.fullname);
    setAge(item.age);
    setSite(item.site);
  };
  console.log(selectedItem);

  const updateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log();

    const updatedData = responseData.map((item) =>
      item.id === selectedItem?.id ? { ...item, fullname, age, site } : item
    );
    setResponseData(updatedData);

    try {
      const docRef = doc(collection(firestore, "user"), selectedItem?.id);
      const x = await updateDoc(docRef, { fullname, age, site });
    } catch (err) {
      console.error("Error updating document: ", err);
    }

    setSelectedItem(null);
    setFullname("");
    setAge(0);
    setSite("");
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(collection(firestore, "user"), id));
      const deleteByfullname = responseData.filter((e) => e.id !== id);
      setResponseData(deleteByfullname);
    } catch (err) {
      console.error("Error deleting document: ", err);
    }
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
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="fullname"
                className="border border-gray-300 rounded mr-2 mb-2 sm:mb-0 px-4 py-2"
              />
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value))}
                placeholder="age"
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
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="fullname"
                className="border border-gray-300 rounded mr-2 mb-2 sm:mb-0 px-4 py-2"
              />
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value))}
                placeholder="age"
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
            key={item.id}
            className="flex items-center justify-between bg-gray-100 rounded-md p-4 mb-2"
          >
            <div>
              <p className="font-semibold">{item.fullname}</p>
              <p className="text-gray-500">{item.site}</p>
            </div>
            <p className="font-semibold">{item.age}</p>
            <div>
              <button
                onClick={() => handleUpdate(item)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(item.id)}
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
