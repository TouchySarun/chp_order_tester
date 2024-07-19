export const getSKU = (barcode: string) => {
  return {
    id: "1",
    name: "น้ำดื่มสิงห์ 1500 มล",
    ap: "บุญรอดเทรดดิ้ง",
    img: "",
    catCode: "C0001",
    catName: "น้ำดื่ม",
    brnCode: "B0001",
    brnName: "สิงห์",
    goods: [
      {
        code: "8850999320007",
        utqname: "ขวด",
        utqqty: 1,
        price0: 10,
        price8: 10,
      },
      {
        code: "8850999320021",
        utqname: "แพค6",
        utqqty: 6,
        price0: 45,
        price8: 42,
      },
      {
        code: "1234000000021",
        utqname: "แพค6",
        utqqty: 6,
        price0: 45,
        price8: 42,
      },
      {
        code: "1234000000022",
        utqname: "แพค6",
        utqqty: 6,
        price0: 45,
        price8: 42,
      },
      {
        code: "1234000000023",
        utqname: "แพค6",
        utqqty: 6,
        price0: 45,
        price8: 42,
      },
      {
        code: "1234000000024",
        utqname: "แพค6",
        utqqty: 6,
        price0: 45,
        price8: 42,
      },
    ],
  } as SKUType;
};
