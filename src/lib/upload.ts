import { db } from "@/../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const addUser = async (data: UserType) => {
  try {
    const docref = await addDoc(collection(db, "user"), data);
    console.log("Success add user with ID:", docref.id);
  } catch (err) {
    console.log("Error adding user.", err);
  }
};
