import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import { useGetUserProfileQuery, useLogoutLazyQuery } from "@/types/graphql";
import { useToast } from "../ui/use-toast";
import { LogOut } from "lucide-react";

export default function Header() {

  const router = useRouter();
  const { toast } = useToast();

  const [logout] = useLogoutLazyQuery();

  const { data: currentUser } = useGetUserProfileQuery({
    errorPolicy: "ignore",
  });

  const handleLogout = () => {
    logout({
      onCompleted: (data) => {
        if (data.logout.success) {
          router.push("/");
          setTimeout(() => {
            toast({
              title: `Bye ${currentUser?.getUserProfile.email} !`,
            });
          }, 500);
        }
      },
    });
  };

  return (
    <header className="sticky top-0 left-0 right-0 p-6 bg-tertiary">
      <div className="flex mx-auto items-center justify-between text-white">
        <Link className="font-bold uppercase" href="/">admin</Link>

        <Button variant={"arrow"} onClick={handleLogout} className="sm:border">
          <span className="sm:hidden">
            <LogOut />
          </span>
          <span className="hidden sm:block">Déconnexion</span>
        </Button>
      </div>
    </header>
  );
}
