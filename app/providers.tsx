"use client";

import { ConvexReactClient } from "convex/react";
import { ConvexProvider } from "convex/react";
import { ClerkProvider } from "@clerk/nextjs";
import UserSync from "./providers/UserSync";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ConvexProvider client={convex}>
        <UserSync />
        {children}
      </ConvexProvider>
    </ClerkProvider>
  );
}