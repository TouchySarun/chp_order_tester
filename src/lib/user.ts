import {
  addDoc,
  collection,
  doc,
  setDoc,
  getDoc,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

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
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as UserType;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    return null;
  }
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
export const editUser = async (userId: string, user: UserType) => {
  try {
    const document = doc(db, `users/${userId}`);
    await setDoc(document, user, { merge: true });
    return true;
  } catch (err) {
    console.log("Fail edit user. :", err);
    return false;
  }
};

// //delete
// export const deleteHotel = async (hotelId: string) => {
//   // get old document for ref
//   const document = doc(firestore, `Hotel/${hotelId}`);
//   // deleteDoc need ref to delete
//   await deleteDoc(document);
//   console.log("Success delete Hotel Id :", hotelId);
// };

// export const editHotel = async (hotelId: string, hotel: HotelType) => {
//   const document = doc(firestore, `Hotel/${hotelId}`);
//   await setDoc(document, hotel, { merge: true });
//   console.log("Success update hotel");
// };

export const getUsers = () => {
  return [
    {
      id: "1",
      username: "SOMCHAI",
      name: "สมชัย พารวย",
      role: "pc",
      branch: "dc",
      ap: [
        {
          id: "2",
          code: "2",
          name: "สหพัฒน์ มาม่า",
          remark: "-",
        },
        {
          id: "3",
          code: "3",
          name: "สหพัฒน์ เปา",
          remark: "-",
        },
      ],
    },
    {
      id: "2",
      username: "CHAIDE",
      name: "ใจดี มีตัง",
      role: "pc",
      branch: "dc",
      ap: [
        {
          id: "2",
          code: "2",
          name: "สหพัฒน์ มาม่า",
          remark: "-",
        },
        {
          id: "3",
          code: "3",
          name: "สหพัฒน์ เปา",
          remark: "-",
        },
      ],
    },
    {
      id: "3",
      username: "MADE",
      name: "มาดี ลีลา",
      role: "pc",
      branch: "dc",
      ap: [
        {
          id: "1",
          code: "1",
          name: "บุญรอดเทรดดิ้ง",
          remark: "-",
        },
      ],
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
