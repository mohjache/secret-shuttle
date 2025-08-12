"use client";
import { Authenticated, AuthLoading } from "convex/react";
import { useParams } from "next/navigation";
import { SpiderChart } from "~/components/charts/SpiderChart";
import { FallbackComponent } from "~/components/fallback";

const Page = () => {
  const { id } = useParams();

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
