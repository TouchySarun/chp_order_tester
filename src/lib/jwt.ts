import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
  expiresIn?: string | number;
}
const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "1h",
};
export function signJwtAccessToken(payload: JwtPayload, options?: SignOption) {
  const secretKey = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secretKey!, options);
  return token;
}

export function verifyJwt(token: string) {
  try {
    const secretKey = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secretKey!);
    return decoded as JwtPayload;
  } catch (error) {
    console.log("Jwt verify error\n", error);
    return null;
  }
}
