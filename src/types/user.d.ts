interface APType {
  code: string;
  name: string;
  remark: string;
}
interface UserType {
  name: string;
  password: string;
  role: string;
  branch: string;
  ap: APType[];
}
