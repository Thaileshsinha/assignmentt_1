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
  const { id } = await request.json();

  try {
    await deleteDoc(doc(collection(firestore, "user"), id));
    return Response.json({ message: "delete successfully" });
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
