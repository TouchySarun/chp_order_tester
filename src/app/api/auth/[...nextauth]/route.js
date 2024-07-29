import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser } from "../../../../lib/user";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = credentials;

        try {
          // get user from database
          const user = await getUser(username);
          if (!user.ok) {
            console.log("Fail to log in, can't find username");
            return null;
          }
          // check user's password
          if (password !== user.data.password) {
            console.log("Fail to log in, wrong password");
            return null;
          }
          console.log(user.data);
          // return user
          return user.data;
        } catch (err) {
          console.log(err);
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
    async jwt({ token, user, session }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          username: user.username,
        };
      }
      return token;
    },
    async session({ token, user, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          username: token.username,
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
