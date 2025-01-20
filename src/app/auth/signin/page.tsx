import { providerMap, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Logger } from "@/utils/logger";
import { Github } from "lucide-react";
import { AuthError } from "next-auth";

const logger = new Logger("Auth:SignIn");

export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  const { callbackUrl } = await props.searchParams;
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#080014] bg-gradient-to-b from-[#080014] to-[#0C0020]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Sign in to your account
          </CardTitle>
          <CardDescription className="text-center">
            Choose your preferred sign in method
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {Object.values(providerMap).map((provider, index) => (
            <form
              key={index}
              action={async () => {
                "use server";
                try {
                  await signIn(provider.id, {
                    redirectTo: callbackUrl ?? "/",
                  });
                } catch (error) {
                  if (error instanceof AuthError) {
                    console.error(error);
                  }
                  throw error;
                }
              }}
            >
              <Button
                className="w-full"
                variant={index === 0 ? "default" : "outline"}
                type="submit"
              >
                {getProviderIcon(provider.id)}
                Sign in with {provider.name}
              </Button>
            </form>
          ))}

          {Object.values(providerMap).length > 1 && (
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function getProviderIcon(providerId: string) {
  switch (providerId) {
    case "github":
      return <Github className="mr-2 h-4 w-4" />;
    default:
      return null;
  }
}
