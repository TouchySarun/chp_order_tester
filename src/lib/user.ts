export const getUsers = () => {
  return [
    {
      id: "1",
      username: "SOMCHAI",
      name: "สมชัย พารวย",
      role: "pc",
      branch: "dc",
      ap: [
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
      ],
    },
    {
      id: "2",
      username: "CHAIDE",
      name: "ใจดี มีตัง",
      role: "pc",
      branch: "dc",
      ap: [
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
      ],
    },
    {
      id: "3",
      username: "MADE",
      name: "มาดี ลีลา",
      role: "pc",
      branch: "dc",
      ap: [
        {
          id: "1",
          code: "1",
          name: "บุญรอดเทรดดิ้ง",
          remark: "-",
        },
      ],
    },
    {
      id: "4",
      username: "SAMORN",
      name: "สมร ศรคำ",
      role: "dc",
      branch: "dc",
      ap: [],
    },
  ] as UserType[];
};
