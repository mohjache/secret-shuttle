"use client";
import { Authenticated, AuthLoading } from "convex/react";
import { SpiderChart } from "~/components/charts/SpiderChart";
import { FallbackComponent } from "~/components/fallback";

const Page = () => {
  return (
    <>
      <AuthLoading>
        <FallbackComponent></FallbackComponent>
      </AuthLoading>
      <Authenticated>
        <SpiderChart></SpiderChart>
      </Authenticated>
    </>
  );
};

export default Page;
