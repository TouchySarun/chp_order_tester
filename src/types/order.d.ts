interface OrderType {
  id?: string;
  startDate?: datetime; //(init date)
  endDate?: datetime;
  name: string;
  utqName: string;
  code: string;
  sku: string;
  ap: string;
  creBy?: string;
  qty: number; //(init qty)
  leftQty: number;
  pending?: boolean; // true = ยังไม่สำเร็จ
  lstUpd?: datetime; // init value = undefind เพื่อตอนสาขาสั่งแล้วขึ้นเลย
  tag?: string; // เอาไว้ปริ้นออเดอร์ทีละชุด หรือ ไว้ export เข้า BPlus
  branch?: string;
  cat?: string;
  brand?: string;
}
