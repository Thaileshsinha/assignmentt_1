"use client";
import React from "react";
import { getDatabase, ref, set } from "firebase/database";
import app from "@/components/firebase";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  updateDoc,
  getDocs,
} from "@firebase/firestore";

const Page: React.FC = () => {
  const firestore = getFirestore(app);
  const writeData = async () => {
    const x = await addDoc(collection(firestore, "cities"), {
      name: "pune",
      pincode: 1234,
      lat: 124,
      long: 989,
    });
    console.log(x);
  };
  const getData = async () => {
    const x = doc(firestore, "cities", "t1YxCNU4OpzTiFsv8Ifc");
    const snap = await getDoc(x);
    console.log(snap.data());
  };

  const getDataa = async () => {
    const collectionRef = collection(firestore, "cities");
    const querySnapshot = await getDocs(collectionRef);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  const updateDocs = async () => {
    const docRef = doc(firestore, "cities", "t1YxCNU4OpzTiFsv8Ifc");
    await updateDoc(docRef, {
      name: "karan",
    });
  };
  return (
    <>
      <h1>sjj</h1>
      <button onClick={writeData}>click karo yaha</button>
      <button onClick={getData}>snap karo yaha</button>
      <button onClick={updateDocs}>update karo yaha</button>
      <button onClick={getDataa}>sabhi data karo yaha</button>
    </>
  );
};

export default Page;
