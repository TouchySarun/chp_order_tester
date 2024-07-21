interface APType {
  id?: string;
  code: string;
  name: string;
  remark: string;
}
interface UserType {
  id?: string;
  username: string;
  name: string;
  password: string;
  role: string;
  branch: string;
  ap: APType[]; // user that ap = [] then my employee
}
