import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser } from "../../../../lib/user";
import { UserType } from "@/types/user";

interface Credentials {
  username: string;
  password: string;
}

interface UserTypeAuth extends User {
  id: string;
  username: string;
  name: string;
  password: string;
  role: string;
  branch: string;
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req): Promise<UserTypeAuth | null> {
        if (!credentials) {
          return null;
        }

        const { username, password } = credentials as Credentials;

        try {
          // get user from database
          const user = await getUser(username);
          if (!user.ok) {
            console.log("Fail to log in, can't find username");
            return null;
          }
          // check user's password
          if (password !== user.data?.password) {
            console.log("Fail to log in, wrong password");
            return null;
          }
          // return user
          return user.data as UserTypeAuth;
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: (user as UserTypeAuth).id,
          role: (user as UserTypeAuth).role,
          username: (user as UserTypeAuth).username,
          branch: (user as UserTypeAuth).branch,
        };
      }
      return token;
    },
    async session({ token, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          username: token.username,
          branch: token.branch,
        } as UserType,
      };
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
