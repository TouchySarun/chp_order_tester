import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import { signJwtAccessToken } from "@/lib/jwt";

const userCollection = collection(db, "users");

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const q = query(userCollection, where("username", "==", username));
  const docSnap = await getDocs(q);
  if (docSnap.empty) {
    return new Response(JSON.stringify({ error: "User not found" }));
  }
  if (docSnap.docs[0].data().password !== password) {
    return new Response(JSON.stringify({ error: "Incorrect password" }));
  }
  const user = {
    id: docSnap.docs[0].id,
    ...docSnap.docs[0].data(),
  } as UserType;
  const { ap, password: password2, name, ...data } = user;
  // gen token
  const accessToken = signJwtAccessToken(data);
  return new Response(JSON.stringify({ ...user, accessToken }));
}
