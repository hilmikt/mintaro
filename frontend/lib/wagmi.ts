import { defaultWagmiConfig } from "@web3modal/wagmi/react";
import { polygon } from "wagmi/chains";

const projectIdEnv =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
  process.env.NEXT_PUBLIC_WC_PROJECT_ID;

if (!projectIdEnv) {
  throw new Error(
    "Missing NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID environment variable."
  );
}

export const projectId = projectIdEnv;
export const chains = [polygon];

export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata: {
    name: "Mintaro",
    description: "Trustless freelance platform",
    url: "https://mintaro.xyz",
    icons: ["https://mintaro.xyz/logo.png"],
  },
});
