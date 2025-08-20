"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const DashboardNav = () => {
  return (
    <div className="bg-background text-primary fixed top-0 right-0 left-0 z-50 flex h-16 justify-between px-4 lg:px-32">
      <div className="mr-4 flex">
        <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">Secret Shuttle</span>
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <UserButton></UserButton>
      </div>
    </div>
  );
};
