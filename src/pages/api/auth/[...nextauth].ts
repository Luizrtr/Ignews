import { query as q } from "faunadb";

import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { fauna } from "../../../services/fauna";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: "read:user",
    }),
    // ...add more providers here
  ],
  jwt: {
    signinKey: process.env.SIGNIN_KEY,
  },
  callbacks: {
    async signIn(user, account, profile) {
      // await fauna.query(q.Create(q.Collection("users"), { data: { email } }));
      // return true;
      try {
        const { email } = user;
        await fauna.query(q.Create(q.Collection("users"), { data: { email } }));
        console.log(user);
        return true;
      } catch {
        return false;
      }
    },
  },
});
