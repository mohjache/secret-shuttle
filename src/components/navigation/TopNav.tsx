"use client";

import Link from "next/link";
import { Button } from "~/ui/button";

export const TopNav = () => {
  return (
    <div className="bg-background text-primary fixed top-0 right-0 left-0 z-50 flex h-16 justify-between px-4 lg:px-32">
      <div className="mr-4 flex">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">Secret Shuttle</span>
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/70 cursor-pointer rounded-lg px-6 py-3 font-semibold transition-colors">
          Sign In
        </Button>
      </div>
    </div>
  );
};
