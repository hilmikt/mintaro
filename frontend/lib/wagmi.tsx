// frontend/lib/wagmi.ts
import { defaultWagmiConfig } from "@web3modal/wagmi/react";
import { polygon } from "wagmi/chains";

export const projectId =
  process.env.NEXT_PUBLIC_WC_PROJECT_ID || "85fb5c5da75543b6892e077b311d379e";

export const wagmiConfig = defaultWagmiConfig({
  chains: [polygon],
  projectId,
  metadata: {
    name: "Mintaro",
    description: "Trustless freelance platform",
    url: "https://mintaro.xyz", // update for production
    icons: ["https://mintaro.xyz/logo.png"],
  },
});
