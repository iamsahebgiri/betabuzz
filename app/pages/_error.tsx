import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import authService from "@/services/auth.service";
import { useRouter } from "next/router";

const CustomErrorComponent = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await authService
      .signOut()
      .catch(() =>
        toast({
          title: "Error!",
          content: "Failed to sign out. Please try again.",
        })
      )
      .finally(() => router.push("/"));
  };

  return (
    <>
      <div className="grid h-full place-items-center p-4">
        <div className="space-y-8 text-center">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Exception Detected!</h3>
            <p className="text-custom-text-200 mx-auto w-1/2 text-sm">
              We{"'"}re Sorry! An exception has been detected, and our
              engineering team has been notified. We apologize for any
              inconvenience this may have caused. Please reach out to our
              engineering team at{" "}
              <a
                href="mailto:iamsahebgiri@gmail.com"
                className="text-custom-primary"
              >
                iamsahebgiri@gmail.com
              </a>{" "}
              for further assistance.
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Button onClick={() => router.back()}>Go back</Button>
            <Button onClick={handleSignOut}>Sign out</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomErrorComponent;
