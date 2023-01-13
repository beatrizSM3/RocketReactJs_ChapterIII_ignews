import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    activeSubscription: object| null;
    expires: string;
  }
}