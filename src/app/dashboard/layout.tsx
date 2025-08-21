"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { Authenticated, AuthLoading } from "convex/react";
import { FallbackComponent } from "~/components/fallback";
import { DashboardNav } from "~/components/navigation/DashboardNav";
import { ConvexClientProvider } from "~/providers/ConvexClientProvider";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      afterSignOutUrl={process.env.NEXT_PUBLIC_REDIRECT_AFTER_SIGNOUT_URL}
    >
      <ConvexClientProvider>
        <>
          <DashboardNav></DashboardNav>
          <AuthLoading>
            <main className="container mx-auto h-screen pt-24 pb-8">
              <div className="mx-auto max-w-2xl">
                <FallbackComponent></FallbackComponent>
              </div>
            </main>
          </AuthLoading>

          <Authenticated>{children}</Authenticated>
        </>
      </ConvexClientProvider>
    </ClerkProvider>
  );
}
