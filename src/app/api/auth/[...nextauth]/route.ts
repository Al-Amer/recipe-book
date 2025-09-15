import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { sql } from "@/lib/dbCon";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await sql`SELECT * FROM users WHERE email = ${credentials?.email}`;
        if (user.length === 0) return null;

        const valid = await bcrypt.compare(credentials!.password, user[0].password_hash);
        if (!valid) return null;

        return { id: user[0].id, email: user[0].email };
      },
    }),
  ],
  session: { strategy: "jwt" as const },
  pages: { signIn: "/login" }, // custom login page
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
