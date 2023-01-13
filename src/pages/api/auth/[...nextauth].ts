import { query as q } from "faunadb"
import NextAuth, { Session } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { fauna } from "../../../services/fauna"

// type  WithAdditionalParams<T> = T & { activeSubscription: object | null; expires: string; };


export default NextAuth ({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'read:user',
        },
      },
    }),
  ],
  // jwt:{
  //   signInKey: process.env.SIGN_IN_KEY,
  // }
  // ,
  callbacks: {
    async session(session) {

      
      try {
        const userActiveSubscription = await fauna.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index('subscription_by_user_ref'),
                q.Select(
                  "ref",
                  q.Get(
                    q.Match(
                      q.Index('user_by_email'),
                      q.Casefold(session.user!.email!)
                    )
                  )
                )
              ),
              q.Match(
                q.Index('subscription_by_status'),
                "active"
              )
            ])
          )
        )

        const newsession = {...session, activeSubscription: userActiveSubscription, expires: session.session.expires, name: session.session.user?.name, email: session.session.user?.email}

        return  newsession; 
        
  
        // return {
        //   ...session,
        //   activeSubscription: userActiveSubscription,
          
        // };
      } catch(err){
        console.log(err, "error")
        const newsession = {...session, activeSubscription: null, expires: session.session.expires, name: session.session.user?.name, email: session.session.user?.email}

        return  newsession; 
        // return {
        //   ...session,
        //   activeSubscription: null
        // };
      }
    },
    async signIn({ user, account, profile }) {
      const { email } = user
     

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email!)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              {
                data: {
                  email
                }
              }
    
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email!)
              )
            )
          )
        )
        return true
      }
      catch{
          return false
      }
     
    },
  
  },
  secret: process.env.NEXTAUTH_SECRET,
})

// export default NextAuth(authOptions)