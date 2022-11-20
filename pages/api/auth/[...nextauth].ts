import NextAuth, { NextAuthOptions } from "next-auth";
import OsuProvider from "next-auth/providers/osu";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        OsuProvider({
            clientId: process.env.OSU_CLIENT_ID as string,
            clientSecret: process.env.OSU_CLIENT_SECRET as string,
            authorization: {
                params: { scope: "public" },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account?.access_token) {
                token.accessToken = account.access_token;
            }

            return token;
        },
    },
} as NextAuthOptions;

export default NextAuth(authOptions);
