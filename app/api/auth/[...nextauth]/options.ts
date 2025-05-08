import type { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username:',
          type: 'text',
          placeholder: 'just-a-username',
        },
        password: {
          label: 'Password:',
          type: 'password',
          placeholder: 'awesome-password',
        },
      },
      async authorize(credentials) {
        //This is where you need to retrieve user data
        //to verify with credentials
        //Docs : https://next-auth.js.org/configuration/providers/credentials
        const user = { id: '42', name: 'Dave', password: 'nextauth' };
        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
