import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    name: string;
    activeSubscription: object| null;
    expires: string;
  }
}