"use client";
import Link from "next/link";
import ConnectWallet from "./ConnectWallet";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-neutral-900/70 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-neutral-100">
          Mintaro
        </Link>
        <ConnectWallet />
      </div>
    </nav>
  );
}