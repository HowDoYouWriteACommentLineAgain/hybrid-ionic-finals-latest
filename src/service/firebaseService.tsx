import { db } from "../firebaseConfig";
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { OrderInfo } from "../models/Interfaces";

const ordersCol = collection(db, "orders");

export const getOrders = async (): Promise<OrderInfo[]> => {
  const snapshot = await getDocs(ordersCol);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as OrderInfo));
};

export const getOrderById = async (id: string): Promise<OrderInfo | null> => {
  const docRef = doc(db, "orders", id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as OrderInfo;
};

export const createOrder = async (order: OrderInfo): Promise<OrderInfo> => {
  const {...data}:Partial<OrderInfo> = order ;
  delete data.id;
  const docRef = await addDoc(ordersCol, data);
  return { id: docRef.id, ...data } as OrderInfo;
};

export const deleteOrder = async (id: string) => {
  const docRef = doc(db, "orders", id);
  await deleteDoc(docRef);
  return true;
};

export const updateOrder = async (order: Partial<OrderInfo> & {id:string}): Promise<Partial<OrderInfo>> => {
  const {id, ...data} = order;
  const docRef = doc(db, "orders", id);
  await updateDoc(docRef, data);
  return order;
};
