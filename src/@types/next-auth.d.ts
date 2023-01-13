import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    name: string | undefined | null;
    activeSubscription: object| null;
    expires: string;
  }
}