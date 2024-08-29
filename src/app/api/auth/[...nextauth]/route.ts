import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser } from "../../../../lib/user";

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
          // get user from database
          const user = await getUser(username);
          if (!user.ok) {
            throw new Error("User not found");
          }
          // check user's password
          if (password !== user.data?.password) {
            throw new Error("Incorrect password");
          }
          // return user
          return user.data as UserTypeAuth;
        } catch (err) {
          throw err;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: /*30 * 24 * */ 2 * 60, // 30 days
  },
  jwt: {
    maxAge: 2 * 60,
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
          rack: (user as UserTypeAuth).rack,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          username: token.username,
          branch: token.branch,
          rack: token.rack,
        },
      } as UserSession;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
