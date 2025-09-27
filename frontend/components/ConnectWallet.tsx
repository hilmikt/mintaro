"use client";

import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

export default function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();

  if (!isConnected) {
    return (
      <button
        onClick={() => open()}
        className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
      >
        Connect
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="rounded bg-neutral-800 px-3 py-1 text-xs text-white">
        {address.slice(0, 6)}…{address.slice(-4)}
      </span>
      <button
        onClick={() => disconnect()}
        className="rounded-xl border border-neutral-700 px-3 py-1 text-xs font-semibold text-neutral-200 hover:border-neutral-500"
      >
        Disconnect
      </button>
    </div>
  );
}
