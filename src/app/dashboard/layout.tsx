import { ClerkProvider } from "@clerk/nextjs";
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
        <DashboardNav></DashboardNav>
        {children}
      </ConvexClientProvider>
    </ClerkProvider>
  );
}
