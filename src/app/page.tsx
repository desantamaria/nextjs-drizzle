import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <div className="min-h-screen bg-[#080014] bg-gradient-to-b from-[#080014] to-[#0C0020] p-4 sm:p-8">
      <main className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white/90">Next js</h1>
          {!session ? (
            <Button asChild>
              <Link href="/api/auth/signin">Sign in</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/api/auth/signout">Sign Out</Link>
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
