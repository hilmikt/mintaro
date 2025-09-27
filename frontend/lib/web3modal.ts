"use client";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { wagmiConfig } from "./wagmi";
import { polygon } from "wagmi/chains";

let initialized = false;
export function initWeb3Modal(projectId: string) {
  if (initialized) return;
  createWeb3Modal({
    wagmiConfig,
    projectId,
    chains: [polygon],
    themeMode: "dark"
  });
  initialized = true;
}
