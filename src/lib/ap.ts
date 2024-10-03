import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const apCollection = collection(db, "aps");

export const getAps = async () => {
  // const docSnap = await getDocs(apCollection);

  // return docSnap.docs.map((doc) => doc.data());

  return [
    "1111 - บุญรอดเทรดดิ้ง",
    "2222 - สหพัฒน์ มาม่า",
    "3333 - สหพัฒน์ เปา",
    "12345 - บริษัท สมมุตินะถ้ามีเจ้าหนี้ที่ชื่อยาวมากจริงๆ ก็จะประมาณนี้ จำกัด มหาชน",
  ];
};
