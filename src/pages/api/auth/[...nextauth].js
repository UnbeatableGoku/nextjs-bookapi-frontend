import { compare } from 'bcrypt';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectMongo from 'src/database/config';
import Users from 'src/models/UserSchema';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        console.log(credentials.email);
        connectMongo().catch((error) => {
          error;
        });
        //check user existance
        const result = await Users.findOne({ email: credentials.email });
        console.log(result);
        if (!result) {
          throw new Error('No user found with this email pls sign up ');
        }

        //compare Password
        const checkPassword = await compare(
          credentials.password,
          result.password
        );

        if (!checkPassword || result.email !== credentials.email) {
          throw new Error('Username Or Password is not Valid');
        }

        return result;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      const userData = {
        email: user.email,
        username: user.username,
      };
      return Promise.resolve(userData);
    },
  },
});
