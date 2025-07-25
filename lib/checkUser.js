// lib/checkUser.js
import { currentUser, auth } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  try {
    // First try to get the full user object
    const user = await currentUser();

    // If currentUser fails (e.g., in server components), fallback to auth()
    if (!user) {
      const { userId } = auth();
      if (!userId) return null;

      // Return minimal mock user info for SSR context where currentUser is unavailable
      return {
        id: userId,
        name: "Test User",
        email: "test@example.com",
        role: "USER", // Replace with actual DB role logic if needed
      };
    }

    // Look for the user in your DB
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    // If not found, create a new user in your DB
    const name = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0]?.emailAddress ?? "",
      },
    });

    return newUser;
  } catch (error) {
    console.error("checkUser error:", error.message);
    return null;
  }
};
