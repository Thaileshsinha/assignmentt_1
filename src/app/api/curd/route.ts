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
export async function GET(request: Request) {
  try {
    console.log(process.env.databaseURL);
    const collectionRef = collection(firestore, "user");
    const querySnapshot = await getDocs(collectionRef);
    const users = querySnapshot.docs.map((doc) => {
      const user = doc.data();
      user.id = doc.id;
      return user;
    });
    return Response.json({ user: users });
  } catch (err) {
    console.log("error registering user", err);
    return Response.json(
      {
        success: false,
        message: "error registering user",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { fullname, age, site } = await request.json();

  try {
    await addDoc(collection(firestore, "user"), { fullname, age, site });
    return Response.json({ fullname, age, site });
  } catch (err) {
    console.log("error registering user", err);
    return Response.json(
      {
        success: false,
        message: "error registering user",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const check = await request.json();
  //   const { fullname, age, site, id } = await request.json();

  try {
    // const docRef = doc(collection(firestore, "user"), id);
    // const x = await updateDoc(docRef, { fullname, age, site });
    return Response.json("update successfully", check);
  } catch (err) {
    console.log("error registering user", err);
    return Response.json(
      {
        success: false,
        message: "error registering user",
      },
      { status: 500 }
    );
  }
}
