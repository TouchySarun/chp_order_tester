import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

const userCollection = collection(db, "users");

// create user
export async function POST(request: Request) {
  const { username, password } = await request.json();
  // looking for exists user.
  const q = query(userCollection, where("username", "==", username));
  const docSnap = await getDocs(q);
  if (!docSnap.empty) {
    return new Response(JSON.stringify({ error: "User already exists." }), {
      status: 409,
    });
  }
  // add new user to db
  const newUser = await addDoc(userCollection, {
    username,
    password,
    name: "default-name",
    role: "default-role",
    branch: "default-branch",
    ap: [],
  });
  console.log("Success create new User with ID:", newUser.id);
  return new Response(JSON.stringify(newUser), { status: 201 });
}

// update user
export async function PUT(request: Request) {}

// delete user
export async function DELETE(request: Request) {}
