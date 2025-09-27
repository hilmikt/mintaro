// app/AppProviders.tsx
"use client";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig, projectId, chains } from "../lib/wagmi";
import { createWeb3Modal } from "@web3modal/wagmi/react";

const queryClient = new QueryClient();
let modalClient: ReturnType<typeof createWeb3Modal> | undefined;

const initializeWeb3Modal = () => {
  if (modalClient || typeof window === "undefined") {
    return modalClient;
  }

  modalClient = createWeb3Modal({
    wagmiConfig,
    projectId,
    chains,
  });

  return modalClient;
};

initializeWeb3Modal();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}