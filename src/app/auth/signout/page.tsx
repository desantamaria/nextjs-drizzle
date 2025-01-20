import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignOutPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#080014] bg-gradient-to-b from-[#080014] to-[#0C0020]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Are you sure you want to sign out?
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form
            action={async formData => {
              "use server";
              await signOut();
            }}
          >
            <Button type="submit">Sign out</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
