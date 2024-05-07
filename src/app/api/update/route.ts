import app from "@/components/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
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
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Document does not exist");
    }

    // Perform the update operation
    await updateDoc(docRef, { fullname, age, site });
    return Response.json(docRef);
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
