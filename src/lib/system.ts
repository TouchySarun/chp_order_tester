import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface SystemResType {
  roles: string[];
  branches: string[];
}

export const getRolesNBranches = async () => {
  const docRef = doc(db, "system", "xha5ZEDMbeh5PCOWwGYJ");
  const docSnap = await getDoc(docRef);
  console.log(docSnap.data());
  return docSnap.data() as SystemResType;
};
