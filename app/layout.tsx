"use client";
import "./globals.css";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonStyles } from "@/components/tailgrids/core/button";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState, createContext } from "react";
import { fetchProducts, Product } from "@/data/products";
import { Badge } from "@/components/tailgrids/core/badge";
import { doLogout } from "@/utils/login";
import { useRouter } from "next/navigation";
import type { Credential } from "@/data/credential";

export const globalDataContext = createContext<any>(null);

export default function RootLayout({ children }: LayoutProps<"/">) {
  const pathname = usePathname();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [carts, setCarts] = useState<Product[]>([]);
  const [credential, setCredential] = useState<Credential | null>(null);

  useEffect(() => {
    const storedCredential = localStorage.getItem("credential");
    setCredential(
      storedCredential ? (JSON.parse(storedCredential) as Credential) : null,
    );
  }, [pathname]);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data as Product[]))
      .catch((err) => setProducts([]));
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  const handleLogout = () => {
    doLogout(router, "/login");
  };

  return (
    <globalDataContext.Provider
      value={{ products, setProducts, carts, setCarts }}
    >
      <html>
        <head>
          <title>CSI205-68096159-ภาณุ ศรีบุญเพ็ง</title>
        </head>
        <body>
          <Header />
          <nav className="flex justify-center gap-3 my-4">
            <Link
              href={"/"}
              className={buttonStyles({
                appearance: pathname === "/" ? "fill" : "outline",
                variant: "primary",
                size: "sm",
              })}
            >
              Home
            </Link>
            <Link
              href={"/calculator"}
              className={buttonStyles({
                appearance: pathname === "/calculator" ? "fill" : "outline",
                variant: "primary",
                size: "sm",
              })}
            >
              Calculator
            </Link>
            <Link
              href={"/animation"}
              className={buttonStyles({
                appearance: pathname === "/animation" ? "fill" : "outline",
                variant: "primary",
                size: "sm",
              })}
            >
              Animation
            </Link>
            <Link
              href={"/todos"}
              className={buttonStyles({
                appearance: pathname === "/todos" ? "fill" : "outline",
                variant: "primary",
                size: "sm",
              })}
            >
              Todos
            </Link>
            <Link
              href={"/products"}
              className={buttonStyles({
                appearance: pathname === "/products" ? "fill" : "outline",
                variant: "primary",
                size: "sm",
              })}
            >
              Products({products.length})
            </Link>
            <div className="relative">
              <Link
                href={"/carts"}
                className={buttonStyles({
                  appearance: pathname === "/carts" ? "fill" : "outline",
                  variant: "primary",
                  size: "sm",
                })}
              >
                Carts
              </Link>
              <Badge
                size={"sm"}
                className="bg-red-500 text-white font-bold absolute -top-2 -right-2 pointer-events-none"
              >
                {carts.length}
              </Badge>
            </div>
            <Button
              className="ml-1"
              appearance="outline"
              variant="danger"
              size="sm"
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
          </nav>
          <div className="my-4 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Role
              </span>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 shadow-sm">
                {credential?.role ?? "-"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                User
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700 shadow-sm">
                {credential?.name ?? "-"}
              </span>
            </div>
          </div>
          <main className="min-h-full flex flex-col">{children}</main>
          <Footer />
        </body>
      </html>
    </globalDataContext.Provider>
  );
}
