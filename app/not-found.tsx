'use client'

import { useRouter } from "next/navigation";
import { checkLogin } from "@/utils/login";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();
  useEffect(() => checkLogin(router, "/"), [router]);
}
