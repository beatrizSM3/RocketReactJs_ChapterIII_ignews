import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    email: string | undefined | null;
    name: string | undefined | null;
    activeSubscription: object| null;
    expires: string;
  }
}