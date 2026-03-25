"use client";

import { SignOutButton } from "@clerk/nextjs";

export default function LogoutButton() {
  return (
    <SignOutButton>
      <button
        style={{
          padding: "8px 16px",
          background: "#ef4444",
          color: "white",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </SignOutButton>
  );
}