"use client";
import Link from "next/link";
import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

type ConnectWalletProps = {
  showProfileButton?: boolean;
};

export default function ConnectWallet({ showProfileButton = true }: ConnectWalletProps) {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();

  if (!isConnected) {
    return (
      <button
        type="button"
        onClick={() => open()}
        className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
      >
        Connect
      </button>
    );
  }

  const truncatedAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Wallet";

  return (
    <div className="flex items-center gap-2">
      <span className="rounded bg-neutral-800 px-3 py-1 text-xs text-white">
        {truncatedAddress}
      </span>
      {showProfileButton ? (
        <Link
          href="/profile"
          className="rounded-xl bg-emerald-600 px-3 py-1 text-xs font-semibold text-neutral-50 transition hover:bg-emerald-500"
        >
          Profile
        </Link>
      ) : null}
      <button
        type="button"
        onClick={() => disconnect()}
        className="rounded-xl border border-neutral-700 px-3 py-1 text-xs font-semibold text-neutral-200 transition hover:border-neutral-500"
      >
        Disconnect
      </button>
    </div>
  );
}