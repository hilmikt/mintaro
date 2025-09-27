# mintaro
Mintaro: Web3 freelance platform MVP - trustless escrow, reputation system, and governance-ready architecture. Built for ETHGlobal, evolving into the production foundation.

## Frontend environment variables

Create `frontend/.env.local` with the following keys:

```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_id
WEB3_STORAGE_TOKEN=your_web3_storage_api_token
```

The `WEB3_STORAGE_TOKEN` lets the profile experience push signed JSON + optional media directly to Filecoin via web3.storage. Each wallet keeps its returned CID locally so the profile can be rehydrated on reconnect without a centralized database.