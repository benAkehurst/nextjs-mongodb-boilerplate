import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  jwt: {
    //@ts-ignore
    encryption: true,
  },
  secret: process.env.SECRET,
  callbacks: {
    //@ts-ignore
    async jwt(token, account) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    //@ts-ignore
    redirect: async (url, _baseUrl) => {
      if (url === "/user") {
        return Promise.resolve("/");
      }
      return Promise.resolve("/");
    },
    async session({ session, token, user }) {
      //@ts-ignore
      session.user._id = user.id;
      return session;
    },
  },
  adapter: MongoDBAdapter(clientPromise),
});
