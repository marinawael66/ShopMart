


import { FailedLoginResponse, SuccessLoginResponse } from "@/interfaces";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credential",
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {

                const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}auth/signin`, {
                    method: "POST",
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                    headers: { "Content-Type": "application/json" },
                }

                );
                const payload: SuccessLoginResponse | FailedLoginResponse = await response.json();

                if ("token" in payload) {
                    return {
                        id: payload.user.email,
                        user: payload.user,
                        token: payload.token,
                    }
                } else {
                    throw new Error(payload.message);
                }



            }
        })
    ],
    callbacks: {
        jwt: ({ token, user }) => {

            if (user) {
                token.user = user.user;
                token.token = user.token;
            }
            return token;
        },

        session: ({ session, token }) => {

            session.user = token.user;
            return session;
        }
    },
    pages: {
        signIn: "/login",
        error: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET,

}