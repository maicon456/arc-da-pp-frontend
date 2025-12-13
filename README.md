# 🤖 ArcnetAI - AI Agent Marketplace on Arc Network

> Create, tokenize, and trade AI agents on Arc Network blockchain

[![Arc Network](https://img.shields.io/badge/Arc%20Network-Testnet-blue)](https://arc.network)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![Wagmi](https://img.shields.io/badge/Wagmi-v2-6366f1)](https://wagmi.sh)

## 🚀 Features

- **AI Agent Creation** - Create and tokenize AI agents
- **Marketplace** - Buy and sell agent tokens
- **Co-Ownership** - Shared ownership model for agents
- **Forum** - Community discussions with on-chain posts
- **Web3 Integration** - Full wallet connection and transaction support
- **Arc Network** - Built on Arc Network testnet with USDC as gas

## 📋 Prerequisites

- Node.js 18+
- npm or pnpm
- MetaMask or compatible wallet
- Arc Network testnet USDC (get from [faucet](https://easyfaucetarc.xyz/))

## 🛠️ Installation

```bash
# Clone repository
git clone https://github.com/maicon456/ArcnetAI.git
cd ArcnetAI

# Install dependencies
npm install
# or
pnpm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your contract addresses
```

## ⚙️ Configuration

Create `.env.local`:

```env
NEXT_PUBLIC_ARC_RPC_URL=https://rpc.testnet.arc.network
NEXT_PUBLIC_VIRTUAL_AGENT_CONTRACT_ADDRESS=0x...
```

## 🚀 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
arc-da-pp-frontend/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── marketplace/       # Marketplace pages
│   ├── forum/             # Forum pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── virtual-agents/    # Agent-related components
│   ├── forum/            # Forum components
│   └── ui/               # UI components (shadcn/ui)
├── lib/                   # Utilities and hooks
│   ├── hooks/            # Custom React hooks
│   ├── arcChain.ts       # Arc Network configuration
│   └── virtualAgentContract.ts  # Contract ABI and helpers
├── contracts/             # Solidity smart contracts
│   └── VirtualAgent.sol  # Main contract
└── public/               # Static assets
```

## 🔗 Links

- **Arc Network:** https://arc.network
- **Arc Testnet Explorer:** https://testnet.arcscan.app
- **Faucet:** https://easyfaucetarc.xyz/
- **Documentation:** See `/docs` folder

## 📚 Documentation

- [Deployment Guide](./DEPLOY_INSTRUCTIONS.md)
- [Backend Implementation](./BACKEND_ONCHAIN_IMPLEMENTATION.md)
- [Vercel NOT_FOUND Solution](./VERCEL_NOT_FOUND_SOLUTION.md)
- [Quick Start](./SETUP.md)

## 🛡️ Error Handling

The app includes comprehensive error handling:

- Custom 404 page (`app/not-found.tsx`)
- Error boundaries (`app/error.tsx`, `app/global-error.tsx`)
- Dynamic route validation
- Transaction error handling

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details

## 👥 Authors

- **ArcnetAI Team**

## 🙏 Acknowledgments

- Arc Network team
- Next.js team
- Wagmi/Viem team
- shadcn/ui

---

**Built with ❤️ on Arc Network**
