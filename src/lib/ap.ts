import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const apCollection = collection(db, "aps");

export const getAps = async () => {
  const docSnap = await getDocs(apCollection);

  return docSnap.docs.map((doc) => doc.data()) as APType[];

  return [
    {
      id: "1",
      code: "1",
      name: "บุญรอดเทรดดิ้ง",
      remark: "-",
    },
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
    {
      id: "4",
      code: "4",
      name: "บริษัท สมมุตินะถ้ามีเจ้าหนี้ที่ชื่อยาวมากจริงๆ ก็จะประมาณนี้ จำกัด มหาชน",
      remark: "-",
    },
  ];
};
