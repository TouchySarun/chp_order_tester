import { collection, where, query, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { getOrderBySKU, getOrderLastDate } from "./order";

interface SKUResType {
  ok: boolean;
  data?: SKUType;
  error?: string;
}

interface CreateOrderDataResType {
  ok: boolean;
  data?: {
    sku: SKUType;
    order: OrderType;
    lastOrder: OrderType;
  };
  error?: string;
}

//user collection
export const skuCollection = collection(db, "skus");

export const getSKUByBarcode = async (barcode: string) => {
  try {
    const q = query(
      skuCollection,
      where("barcodes", "array-contains", barcode)
      // where("ap", "==", "1111")
    );
    const docSnap = await getDocs(q);

    if (!docSnap.empty) {
      console.log("success ");
      return {
        ok: true,
        data: { id: docSnap.docs[0].id, ...docSnap.docs[0].data() } as SKUType,
      } as SKUResType;
    } else {
      console.log("can't find match barcode.", barcode);
      return {
        ok: false,
      } as SKUResType;
    }
  } catch (err) {
    console.log("Error, getting sku by barcode. :", err);
  }
};

export const getCreateOrderData = async (barcode: string, branch: string) => {
  try {
    const skuRes = await getSKUByBarcode(barcode);
    if (!skuRes || !skuRes?.ok || !skuRes.data) {
      return {
        ok: false,
        error: "Error in get create order data: \nSKU not found.",
      } as CreateOrderDataResType;
    }
    const orderRes = await getOrderBySKU(skuRes.data.id, branch);
    if (!orderRes?.ok) {
      return {
        ok: false,
        error: "Error in get create order data: ",
      } as CreateOrderDataResType;
    }
    const lastDateRes = await getOrderLastDate(skuRes.data.id, branch);
    if (!lastDateRes?.ok) {
      return {
        ok: false,
        error: "Error in get create order data: ",
      } as CreateOrderDataResType;
    }
    return {
      ok: true,
      data: {
        sku: skuRes.data,
        order: orderRes.data,
        lastOrder: lastDateRes.data,
      },
    } as CreateOrderDataResType;
  } catch (err) {
    return {
      ok: false,
      error: "Catch :" + err,
    } as CreateOrderDataResType;
  }
};

// export const getSKU = (barcode: string) => {
//   return {
//     id: "1",
//     name: "น้ำดื่มสิงห์ 1500 มล",
//     apCode: "1111",
//     apName: "บุญรอดเทรดดิ้ง",
//     img: "",
//     catCode: "C0001",
//     catName: "น้ำดื่ม",
//     brnCode: "B0001",
//     brnName: "สิงห์",
//     goods: [
//       {
//         code: "8850999320007",
//         utqname: "ขวด",
//         utqqty: 1,
//         price0: 10,
//         price8: 10,
//       },
//       {
//         code: "8850999320021",
//         utqname: "แพค6",
//         utqqty: 6,
//         price0: 45,
//         price8: 42,
//       },
//       {
//         code: "1234000000021",
//         utqname: "แพค6",
//         utqqty: 6,
//         price0: 45,
//         price8: 42,
//       },
//       {
//         code: "1234000000022",
//         utqname: "แพค6",
//         utqqty: 6,
//         price0: 45,
//         price8: 42,
//       },
//       {
//         code: "1234000000023",
//         utqname: "แพค6",
//         utqqty: 6,
//         price0: 45,
//         price8: 42,
//       },
//       {
//         code: "1234000000024",
//         utqname: "แพค6",
//         utqqty: 6,
//         price0: 45,
//         price8: 42,
//       },
//     ],
//   } as SKUType;
// };
