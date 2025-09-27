// app/AppProviders.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig, projectId, chains } from "../lib/wagmi";
import { createWeb3Modal } from "@web3modal/wagmi/react";

const queryClient = new QueryClient();
let modalClient: ReturnType<typeof createWeb3Modal> | undefined;

const Web3ModalReadyContext = createContext(false);
export const useWeb3ModalReady = () => useContext(Web3ModalReadyContext);

const initializeWeb3Modal = () => {
  if (modalClient || typeof window === "undefined") {
    return modalClient;
  }

  modalClient = createWeb3Modal({
    wagmiConfig,
    projectId,
    defaultChain: chains[0],
  });

  return modalClient;
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isWeb3ModalReady, setWeb3ModalReady] = useState(false);

  useEffect(() => {
    const client = initializeWeb3Modal();
    if (client) {
      setWeb3ModalReady(true);
    }
  }, []);

  return (
    <Web3ModalReadyContext.Provider value={isWeb3ModalReady}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </WagmiProvider>
    </Web3ModalReadyContext.Provider>
  );
}