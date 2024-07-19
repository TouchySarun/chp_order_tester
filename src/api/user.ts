import type { NextApiRequest, NextApiResponse } from "next";
import { addUser } from "@/lib/upload";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body;
    try {
      await addUser(data);
      res.status(200).json({ message: "Success added user." });
    } catch (err) {
      res.status(500).json({ error: "Error adding user" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
