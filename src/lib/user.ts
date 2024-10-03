import {
  addDoc,
  collection,
  doc,
  setDoc,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import axios from "@/app/api/axios";

interface GetUserResType {
  ok: boolean;
  data?: UserType;
}

//user collection
export const userCollection = collection(db, "users");

export const getUser = async (username: string) => {
  const q = query(userCollection, where("username", "==", username));

  const docSnap = await getDocs(q);

  if (!docSnap.empty) {
    return {
      ok: true,
      data: { id: docSnap.docs[0].id, ...docSnap.docs[0].data() } as UserType,
    } as GetUserResType;
  } else {
    return {
      ok: false,
    } as GetUserResType;
  }
};
export const getUserById = async (id: string) => {
  try {
    const res = await axios.get(`users/${id}`);
    console.log(res.data);
    const user = await res.data;
    if (user.error) {
      throw new Error(user.error);
    } else {
      return user as UserType;
    }
  } catch (err) {
    throw err;
  }

  // const docRef = doc(db, "users", id);
  // const docSnap = await getDoc(docRef);

  // if (docSnap.exists()) {
  //   return docSnap.data() as UserType;
  // } else {
  //   // docSnap.data() will be undefined in this case
  //   console.log("No such document!");
  //   return null;
  // }
};
//register
export const addUser = async (user: UserRegisterType) => {
  const newUser = await addDoc(userCollection, {
    ...user,
    name: "default-name",
    role: "default-role",
    branch: "default-branch",
    ap: [],
  });
  console.log("Success create new User with ID:", newUser.id);
  return newUser;
};
// edit
export const editUser = async (id: string, user: UserType) => {
  try {
    console.log(user);

    const res = await axios.put(`users/${id}`, { ...user });
    console.log(res);
    return true;
  } catch (err) {
    console.log("Fail edit user. :", err);
    return false;
  }
};

export const getUsers = () => {
  return [
    {
      id: "1",
      username: "SOMCHAI",
      name: "สมชัย พารวย",
      role: "pc",
      branch: "dc",
      ap: [""],
    },
    {
      id: "2",
      username: "CHAIDE",
      name: "ใจดี มีตัง",
      role: "pc",
      branch: "dc",
      ap: [],
    },
    {
      id: "3",
      username: "MADE",
      name: "มาดี ลีลา",
      role: "pc",
      branch: "dc",
      ap: [],
    },
    {
      id: "4",
      username: "SAMORN",
      name: "สมร ศรคำ",
      role: "dc",
      branch: "dc",
      ap: [],
    },
  ] as UserType[];
};
