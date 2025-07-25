'use client';

import { SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SignedOutButtons() {
  return (
    <SignedOut>
      <Button size="lg" asChild>
        <Link href="/sign-up">Sign Up Now !</Link>
      </Button>
    </SignedOut>
  );
}
