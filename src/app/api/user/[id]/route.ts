import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../../../firebaseConfig";

// get user by id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // const user = request.headers["user"];

  const docRef = doc(db, "users", params.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return new Response(JSON.stringify(docSnap.data()));
  } else {
    return new Response(JSON.stringify({ error: "User not found." }), {
      status: 404,
    });
  }
}

// update user
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await request.json();
  const document = doc(db, `users/${params.id}`);
  await setDoc(document, user, { merge: true });
}
