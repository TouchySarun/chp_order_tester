import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { setAccessToken } from "../../axios";

interface Credentials {
  username: string;
  password: string;
}

interface UserTypeAuth extends User {
  id: string;
  username: string;
  name: string;
  role: string;
  branch: string;
  rack: string;
  password: string;
  accessToken: string;
}

interface UserSession extends Session {
  user: UserTypeAuth;
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req): Promise<UserTypeAuth | null> {
        if (!credentials) {
          throw new Error("No credentials provided");
        }
        const { username, password } = credentials as Credentials;
        try {
          const res = await axios.post("/login", { username, password });
          const user = res.data;
          if (user.error) {
            throw new Error(user.error);
          } else {
            setAccessToken(user.accessToken);
            return user as UserTypeAuth;
          }
        } catch (err) {
          throw err;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 2 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 2 * 60,
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
          ...user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
        },
      } as UserSession;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
