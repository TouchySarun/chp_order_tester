interface SKUType {
  id: string;
  name: string;
  ap: string; // ap_code
  img?: string;
  catCode: string;
  catName: string;
  brnCode: string;
  brnName: string;
  goods: GoodsType[];
}

interface GoodsType {
  code: string;
  utqname: string;
  utqqty: number;
  price0: number; // ราคาตาราง 0
  price8: number; // ราคาตาราง 8
}
