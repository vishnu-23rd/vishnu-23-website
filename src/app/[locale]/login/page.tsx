"use client";

import { useEffect } from "react";
import { auth, provider } from "@/lib/services/firebase.client";
import { signInWithRedirect, getRedirectResult } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    getRedirectResult(auth)
      .then(async (result) => {
        if (result?.user) {
          console.log("the result ! : ", result);
          const token = await result.user.getIdToken();
          await fetch("/api/v1/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });
          router.replace("/dashboard");
        }
      })
      .catch(console.error);
  }, [router]);

  const handleSignIn = () => {
    signInWithRedirect(auth, provider);
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  );
}
