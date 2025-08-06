"use client";

import { Authenticated, AuthLoading } from "convex/react";
import { FallbackComponent } from "~/components/fallback";

const Page = () => {
  return (
    <main className="container mx-auto h-screen pt-24 pb-8">
      <div className="mx-auto max-w-2xl">
        <AuthLoading>
          <FallbackComponent></FallbackComponent>
        </AuthLoading>
        <Authenticated>
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
            <p className="mt-4 text-lg">This is your dashboard area.</p>
          </div>
        </Authenticated>
      </div>
    </main>
  );
};

export default Page;
