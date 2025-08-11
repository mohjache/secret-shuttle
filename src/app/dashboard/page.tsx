"use client";

import { Authenticated, AuthLoading } from "convex/react";
import { AnimatePresence, motion } from "motion/react";
import { useState, useMemo } from "react";
import { FallbackComponent } from "~/components/fallback";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import Image from "next/image";

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

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (u) =>
          u.firstName.toLowerCase().includes(search.toLowerCase()) ||
          u.lastName.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );
  return (
    <main className="container mx-auto h-screen pt-24 pb-8">
      <div className="mx-auto max-w-2xl">
        <AuthLoading>
          <FallbackComponent></FallbackComponent>
        </AuthLoading>
        <Authenticated>
          <div>
            <div className="mb-6">
              <Input
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              <AnimatePresence>
                {filteredUsers.map((user) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="flex items-center p-4">
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
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </Authenticated>
      </div>
    </main>
  );
};

export default Page;
