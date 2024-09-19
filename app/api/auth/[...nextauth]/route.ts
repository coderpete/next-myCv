import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username", 
          type: "text", 
          placeholder: "pete@email.com", 
          value: "pete@email.com",
        },
        password: {  label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        console.log({ credentials },'inside authorize')
        if(!credentials?.username || !credentials?.password) {
          return null
        }
        const {username, password} = credentials;
        console.log({
          body: JSON.stringify({
            username,
            password,
          })
        })
        const res = await fetch("http://localhost:8000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });
        console.log({res}, 'resopnse from NESTJS API');

        if (res.status == 401) {
          // user not authenticated
          console.log({ error: res.statusText }, 'user failed to authenticate');
          return null;
        }
        console.log(`user authenticated successfully`);
        console.log(`parsing jwt token`);
        const user = await res.json();
        // this shjould return the jwt token
        console.log ({user}, 'returning jwt token');
        return user;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log({ token, user }, 'jwt callback');
      if (user) {
        return { ...token, ...user };
      }

      return token;
    },

    async session({ token, session}) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      console.log({ session, token }, 'inside session callback');
      
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

