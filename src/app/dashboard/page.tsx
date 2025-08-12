"use client";

import { Authenticated, AuthLoading } from "convex/react";
import { AnimatePresence, motion } from "motion/react";
import { useState, useMemo } from "react";
import { FallbackComponent } from "~/components/fallback";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import Image from "next/image";
import { useDebounce } from "~/lib/useDebounce";
import Link from "next/link";

const users: User[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    imageUrl:
      "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zMHVTNExQUW1qU2xwN0lpaTlsQTlzOEJTVG0ifQ",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Doe",
    imageUrl:
      "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zMHVTNExQUW1qU2xwN0lpaTlsQTlzOEJTVG0ifQ",
  },
  {
    id: "3",
    firstName: "Jim",
    lastName: "Doe",
    imageUrl:
      "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zMHVTNExQUW1qU2xwN0lpaTlsQTlzOEJTVG0ifQ",
  },
  {
    id: "4",
    firstName: "John",
    lastName: "Doe",
    imageUrl:
      "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zMHVTNExQUW1qU2xwN0lpaTlsQTlzOEJTVG0ifQ",
  },
  {
    id: "5",
    firstName: "Jane",
    lastName: "Doe",
    imageUrl:
      "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zMHVTNExQUW1qU2xwN0lpaTlsQTlzOEJTVG0ifQ",
  },
  {
    id: "6",
    firstName: "Jim",
    lastName: "Doe",
    imageUrl:
      "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zMHVTNExQUW1qU2xwN0lpaTlsQTlzOEJTVG0ifQ",
  },
];

type User = {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
};

const Page = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (u) =>
          u.firstName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          u.lastName.toLowerCase().includes(debouncedSearch.toLowerCase()),
      ),
    [debouncedSearch],
  );
  return (
    <main className="container mx-auto h-screen pt-24 pb-8">
      <div className="mx-auto max-w-2xl">
        <AuthLoading>
          <FallbackComponent></FallbackComponent>
        </AuthLoading>
        <Authenticated>
          <>
            <div className="mx-2 mb-6">
              <Input
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
              <AnimatePresence>
                {filteredUsers.map((user) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link href={`/dashboard/user/${user.id}`} prefetch={false}>
                      <Card className="hover:bg-accent mx-2 flex items-center p-4 transition-colors">
                        <Image
                          src={user.imageUrl}
                          alt="profile picture"
                          width={56}
                          height={56}
                        />
                        <CardContent className="p-0">
                          <div className="text-lg font-semibold">
                            {user.firstName} {user.lastName}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        </Authenticated>
      </div>
    </main>
  );
};

export default Page;
