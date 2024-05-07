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
const firestore = getFirestore(app);

export async function POST(request: Request) {
  //   const check = await request.json();
  const { fullname, age, site, id } = await request.json();

  try {
    const docRef = doc(collection(firestore, "user"), id);
    const x = await updateDoc(docRef, { fullname, age, site });
    return Response.json({ message: "update successfully" });
  } catch (err) {
    console.log("error registering user", err);
    return Response.json(
      {
        success: false,
        message: err,
      },
      { status: 500 }
    );
  }
}
