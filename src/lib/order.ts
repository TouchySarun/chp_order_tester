import {
  addDoc,
  collection,
  doc,
  setDoc,
  getDoc,
  where,
  query,
  getDocs,
  and,
  limit,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface OrderResType {
  ok: boolean;
  data?: OrderType;
}

//user collection
export const orderCollection = collection(db, "orders");

export const getOrderBySKU = async (sku: string, branch: string) => {
  try {
    const q = query(
      orderCollection,
      and(
        where("sku", "==", sku),
        where("pending", "==", true),
        where("branch", "==", branch)
      )
      // where("ap", "==", "1111")
    );
    const docSnap = await getDocs(q);

    if (!docSnap.empty) {
      console.log("success ");
      return {
        ok: true,
        data: {
          id: docSnap.docs[0].id,
          ...docSnap.docs[0].data(),
        } as OrderType,
      } as OrderResType;
    } else {
      console.log("can't find match sku.", sku);
      return {
        ok: true,
      } as OrderResType;
    }
  } catch (err) {
    console.log("Error get order by sku. :", err);
  }
};

export const getOrderLastDate = async (sku: string, branch: string) => {
  try {
    const q = query(
      orderCollection,
      and(
        where("sku", "==", sku),
        where("pending", "==", false),
        where("branch", "==", branch)
      ),
      orderBy("endDate", "desc"),
      limit(1)
    );
    const docSnap = await getDocs(q);
    if (!docSnap.empty) {
      return {
        ok: true,
        data: {
          id: docSnap.docs[0].id,
          ...docSnap.docs[0].data(),
        } as OrderType,
      } as OrderResType;
    } else {
      return {
        ok: true,
      } as OrderResType;
    }
  } catch (err) {
    //console.log("Error get order last date. :", err);
  }
};

export const addOrder = async (order: OrderType) => {
  try {
    const newOrder = await addDoc(orderCollection, order);
    console.log("Success create new Order with ID:", newOrder.id);
    return { ok: true } as OrderResType;
  } catch (err) {
    console.log("Error, create new order. :", err);
    return { ok: false } as OrderResType;
  }
};

export const editOrder = async (orderId: string, order: OrderType) => {
  try {
    const document = doc(db, `orders/${orderId}`);
    await setDoc(document, order, { merge: true });
    return { ok: true } as OrderResType;
  } catch (err) {
    console.log("Fail edit user. :", err);
    return { ok: false } as OrderResType;
  }
};

export const getOrder = (sku: string) => {
  return {
    id: "1",
    startDate: new Date(),
    name: "น้ำดื่มสิงห์ 1500 มล",
    utqName: "แพค6",
    code: "",
    sku: "1",
    ap: "",
    creBy: "touch",
    qty: 150, //(init qty)
    leftQty: 150,
    pending: true, // init value = undefind เพื่อตอนสาขาสั่งแล้วขึ้นเลย
  } as OrderType;
};

export const getOrders = () => {
  return [
    {
      id: "1",
      startDate: new Date(),
      name: "น้ำดื่มสิงห์ 1500 มล",
      utqName: "แพค6",
      code: "8850999320021",
      sku: "1",
      ap: "1",
      creBy: "touch",
      qty: 150,
      leftQty: 150,
      pending: true,
      tag: "",
      branch: "009",
      cat: "น้ำดื่ม",
      brn: "สิงห์",
    },
    {
      id: "2",
      startDate: new Date(),
      name: "น้ำดื่มสิงห์ 600 มล",
      utqName: "แพค12",
      code: "8850999320007",
      sku: "2",
      ap: "1",
      creBy: "touch",
      qty: 200,
      leftQty: 200,
      pending: true,
      tag: "",
      branch: "009",
      cat: "น้ำดื่ม",
      brn: "สิงห์",
    },
    {
      id: "3",
      startDate: new Date(),
      name: "น้ำดื่มสิงห์ 600 มล",
      utqName: "แพค12",
      code: "8850999320007",
      sku: "2",
      ap: "1",
      creBy: "touch",
      qty: 200,
      leftQty: 200,
      pending: true,
      tag: "",
      branch: "008",
      cat: "น้ำดื่ม",
      brn: "สิงห์",
    },
    {
      id: "4",
      startDate: new Date(),
      name: "น้ำดื่มสิงห์ 600 มล",
      utqName: "แพค12",
      code: "8850999320007",
      sku: "2",
      ap: "1",
      creBy: "touch",
      qty: 200,
      leftQty: 200,
      pending: true,
      tag: "",
      branch: "008",
      cat: "น้ำดื่ม",
      brn: "สิงห์",
    },
    {
      id: "5",
      startDate: new Date(),
      name: "ตัวอย่างสินค้าที่ชื่อยาวมาก ถึงมากที่สุด และมันยาวมากจริงๆไม่อยากจะโม้",
      utqName: "กระสอบ*25",
      code: "8850999312345",
      sku: "3",
      ap: "2",
      creBy: "touch",
      qty: 1500,
      leftQty: 1500,
      pending: true,
      tag: "",
      branch: "008",
      cat: "น้ำดื่ม",
      brn: "สิงห์",
    },
  ];
};
