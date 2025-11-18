import { Button } from "@/components/ui/button";

function OtherProviders() {
  return (
    <>
      <div className="relative my-4 flex items-center">
        <span className="border-primary grow border-t"></span>
        <span className="text-muted-foreground mx-2 text-sm">
          or continue with
        </span>
        <span className="border-primary grow border-t"></span>
      </div>

      <div className="flex flex-col gap-2">
        <Button variant="outline" className="w-full" disabled>
          Sign in with Google
        </Button>
        <Button variant="outline" className="w-full" disabled>
          Sign in with GitHub
        </Button>
      </div>
    </>
  );
}

export default OtherProviders;
