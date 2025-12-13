"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, FileText, Network, Zap, Shield, Code, BookOpen, Settings, Rocket, Link2, Database, Lock, Globe, Wallet, Layers, TrendingUp } from "lucide-react"

export function DocsSection() {
  const docSections = [
    {
      title: "Get Started",
      icon: Rocket,
      links: [
        { name: "Welcome to Arc", url: "https://docs.arc.network/arc/concepts/welcome-to-arc", description: "Introduction to Arc Network" },
        { name: "Deploy on Arc", url: "https://docs.arc.network/arc/tutorials/deploy-on-arc", description: "Quickstart deployment guide" },
        { name: "Explorer", url: "https://testnet.arcscan.app", description: "Block explorer for Arc Testnet" },
        { name: "Faucet", url: "https://easyfaucetarc.xyz/", description: "Get test USDC tokens" },
      ]
    },
    {
      title: "References",
      icon: BookOpen,
      links: [
        { name: "Connect to Arc", url: "https://docs.arc.network/arc/references/connect-to-arc", description: "RPC endpoints and connection details" },
        { name: "Contract Addresses", url: "https://docs.arc.network/arc/references/contract-addresses", description: "Official contract addresses" },
        { name: "Gas and Fees", url: "https://docs.arc.network/arc/references/gas-and-fees", description: "Understanding gas and transaction fees" },
      ]
    },
    {
      title: "Key Features",
      icon: Zap,
      links: [
        { name: "Stable Fee Design", url: "https://docs.arc.network/arc/concepts/stable-fee-design", description: "USDC-based predictable fees" },
        { name: "Deterministic Finality", url: "https://docs.arc.network/arc/concepts/deterministic-finality", description: "Sub-second transaction finality" },
        { name: "Opt-in Privacy", url: "https://docs.arc.network/arc/concepts/opt-in-privacy", description: "Configurable privacy features" },
      ]
    },
    {
      title: "Architecture",
      icon: Layers,
      links: [
        { name: "System Overview", url: "https://docs.arc.network/arc/architecture/system-overview", description: "High-level system architecture" },
        { name: "Consensus Layer", url: "https://docs.arc.network/arc/architecture/consensus-layer", description: "Malachite BFT consensus" },
        { name: "Execution Layer", url: "https://docs.arc.network/arc/architecture/execution-layer", description: "EVM-compatible execution" },
        { name: "EVM Compatibility", url: "https://docs.arc.network/arc/architecture/evm-compatibility", description: "Ethereum compatibility details" },
      ]
    },
    {
      title: "Tools",
      icon: Settings,
      links: [
        { name: "Account Abstraction", url: "https://docs.arc.network/arc/tools/account-abstraction", description: "Smart contract wallets" },
        { name: "Block Explorers", url: "https://docs.arc.network/arc/tools/block-explorers", description: "Available block explorers" },
        { name: "Compliance", url: "https://docs.arc.network/arc/tools/compliance", description: "Compliance tools and features" },
        { name: "Data Indexers", url: "https://docs.arc.network/arc/tools/data-indexers", description: "Indexing solutions" },
        { name: "Node Providers", url: "https://docs.arc.network/arc/tools/node-providers", description: "RPC node providers" },
      ]
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold mb-3">Arc Network Documentation</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Complete documentation for Arc Network, an open Layer-1 blockchain purpose-built to unite programmable money 
          and onchain innovation with real-world economic activity.
        </p>
      </div>

      {/* Overview Card */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Network className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>What is Arc Network?</CardTitle>
              <CardDescription>Economic OS for the internet</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Arc is designed to serve as the Economic OS for the internet, enabling builders and issuers worldwide to
            power the next era of onchain lending, capital markets, FX, and payments. Engineered for mass adoption, 
            Arc features predictable fiat-based fees using stablecoins as gas (USDC), deterministic sub-second finality, 
            opt-in configurable privacy, and direct integration with Circle's full-stack platform.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                Key Features
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Stable fee design using USDC as gas</li>
                <li>Deterministic sub-second finality</li>
                <li>Opt-in configurable privacy</li>
                <li>EVM-compatible network</li>
                <li>Circle's full-stack integration</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Core Principles
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Purpose-built for economic activity</li>
                <li>Open and composable by default</li>
                <li>Market-neutral and multichain-aligned</li>
                <li>Trusted infrastructure end-to-end</li>
                <li>Built to coordinate, not control</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documentation Sections */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {docSections.map((section) => {
          const Icon = section.icon
          return (
            <Card key={section.title} className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {section.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm group-hover:text-primary transition-colors">
                            {link.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {link.description}
                          </p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Use Cases */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Onchain Credit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Identity-based lending protocols</li>
              <li>• Reputation-driven credit systems</li>
              <li>• SMB and consumer credit apps</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Capital Markets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Tokenized securities platforms</li>
              <li>• Collateral management systems</li>
              <li>• Tokenized funds and structured products</li>
              <li>• Prediction markets</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              Stablecoin FX
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Perpetuals and derivatives exchanges</li>
              <li>• Swap APIs for stablecoin conversion</li>
              <li>• Treasury tools for multi-currency rebalancing</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Agentic Commerce
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• AI-mediated marketplaces</li>
              <li>• Machine-to-machine payment networks</li>
              <li>• Coordination systems for agents</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Cross-border Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Remittance platforms</li>
              <li>• Payout systems for marketplaces</li>
              <li>• Trade finance platforms</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Network Information */}
      <Card className="bg-muted/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Code className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Network Information</CardTitle>
              <CardDescription>Arc Testnet Configuration</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Chain ID</p>
              <p className="text-sm text-muted-foreground font-mono">5042002 (0x4CEF52)</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Native Currency</p>
              <p className="text-sm text-muted-foreground">USDC (18 decimals)</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">RPC URL</p>
              <p className="text-sm text-muted-foreground font-mono break-all">https://rpc.testnet.arc.network</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Block Explorer</p>
              <a
                href="https://testnet.arcscan.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                testnet.arcscan.app
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Finality</p>
              <p className="text-sm text-muted-foreground">Deterministic sub-second</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Consensus</p>
              <p className="text-sm text-muted-foreground">Malachite BFT</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5" />
            Quick Links
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <a
              href="https://docs.arc.network"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm"
            >
              <FileText className="h-4 w-4" />
              Full Docs
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://testnet.arcscan.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/20 bg-background hover:bg-primary/10 transition-colors font-medium text-sm"
            >
              <Network className="h-4 w-4" />
              Explorer
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://easyfaucetarc.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/20 bg-background hover:bg-primary/10 transition-colors font-medium text-sm"
            >
              <Zap className="h-4 w-4" />
              Faucet
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://arc.network"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/20 bg-background hover:bg-primary/10 transition-colors font-medium text-sm"
            >
              <Globe className="h-4 w-4" />
              Website
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
