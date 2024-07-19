import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { HotelType } from "@/types/hotel";

export const firestore = getFirestore(app);

//Hotel collection
export const hotelcollection = collection(firestore, "Hotel");

//Add hotel
export const addHotel = async (hotel: HotelType) => {
  const newHotel = await addDoc(hotelcollection, { ...hotel });
  console.log("Success create new Hotel with ID:", newHotel.id);
};

//delete
export const deleteHotel = async (hotelId: string) => {
  // get old document for ref
  const document = doc(firestore, `Hotel/${hotelId}`);
  // deleteDoc need ref to delete
  await deleteDoc(document);
  console.log("Success delete Hotel Id :", hotelId);
};

export const editHotel = async (hotelId: string, hotel: HotelType) => {
  const document = doc(firestore, `Hotel/${hotelId}`);
  await setDoc(document, hotel, { merge: true });
  console.log("Success update hotel");
};
