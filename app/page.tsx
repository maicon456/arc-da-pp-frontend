"use client"

import { useState } from "react"
import { DocsSection } from "@/components/docs-section"
import { ForumSection } from "@/components/forum/forum-section"
import { Toaster } from "@/components/ui/toaster"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, FileText, Bot, ArrowRight, MessageSquare, Twitter, MessageCircle, Globe } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ConnectWalletButton } from "@/components/connect-wallet-button"

export default function Home() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary via-primary/80 to-accent flex items-center justify-center shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  Arcnet<span className="bg-gradient-to-r from-primary via-chart-1 to-chart-2 bg-clip-text text-transparent font-extrabold">AI</span>
                </h1>
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-primary">AI</span> (Inteligência Artificial) Agent Marketplace
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://easyfaucetarc.xyz/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Faucet
                </Button>
              </a>
              <ConnectWalletButton variant="outline" size="sm" />
            </div>
          </div>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-[73px] z-40 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-8">
              <TabsList className="inline-flex h-12 items-center justify-center rounded-none bg-transparent p-0 gap-8">
                <TabsTrigger
                  value="home"
                  className="relative gap-2 rounded-none border-0 bg-transparent px-4 pb-3 pt-3 font-medium text-muted-foreground transition-all hover:text-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:opacity-0 after:transition-opacity data-[state=active]:after:opacity-100"
                >
                  <Sparkles className="h-4 w-4" />
                  Home
                </TabsTrigger>
                <TabsTrigger
                  value="docs"
                  className="relative gap-2 rounded-none border-0 bg-transparent px-4 pb-3 pt-3 font-medium text-muted-foreground transition-all hover:text-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:opacity-0 after:transition-opacity data-[state=active]:after:opacity-100"
                >
                  <FileText className="h-4 w-4" />
                  Docs
                </TabsTrigger>
                <TabsTrigger
                  value="forum"
                  className="relative gap-2 rounded-none border-0 bg-transparent px-4 pb-3 pt-3 font-medium text-muted-foreground transition-all hover:text-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:opacity-0 after:transition-opacity data-[state=active]:after:opacity-100"
                >
                  <MessageSquare className="h-4 w-4" />
                  Forum
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        {activeTab === "home" && (
          <section className="py-20 px-4">
            <div className="container mx-auto text-center max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20 text-primary text-sm mb-6 border border-primary/30 backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                <span className="font-medium">Powered by Arc Network</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance tracking-tight">
                Arcnet<span className="bg-gradient-to-r from-primary via-chart-1 to-chart-2 bg-clip-text text-transparent font-extrabold">AI</span>{" "}
                <span className="text-muted-foreground">Inteligência Artificial</span>{" "}
                on Arc Network
              </h2>
              <p className="text-lg text-muted-foreground mb-8 text-pretty leading-relaxed max-w-2xl mx-auto">
                Create, tokenize, and trade <span className="font-semibold text-primary">AI</span> (Inteligência Artificial) agents on Arc Network.
                Enable co-ownership and build the future of decentralized <span className="font-semibold text-primary">AI</span>.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/marketplace">
                  <Button size="lg" className="gap-2">
                    <Bot className="h-5 w-5" />
                    Explore Marketplace
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Stats Section */}
        {activeTab === "home" && (
          <section className="py-12 border-y bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                  <p className="text-3xl font-bold tracking-tight">Tokenized</p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">AI</span> agents as assets
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold tracking-tight">Co-Ownership</p>
                  <p className="text-sm text-muted-foreground">Shared ownership model</p>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold tracking-tight">Arc Network</p>
                  <p className="text-sm text-muted-foreground">USDC as gas</p>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="py-20 px-4">
          <div className="container mx-auto">
            <TabsContent value="home">
              <div className="mb-12 text-center">
                <h3 className="text-3xl font-bold mb-3 tracking-tight">Get Started</h3>
                <p className="text-muted-foreground mb-6">
                  Create your first <span className="font-semibold text-primary">AI</span> (Inteligência Artificial) agent or explore the marketplace
                </p>
                <Link href="/marketplace">
                  <Button size="lg" className="gap-2">
                    <Bot className="h-5 w-5" />
                    Go to Marketplace
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="docs">
              <DocsSection />
            </TabsContent>

            <TabsContent value="forum">
              <ForumSection />
            </TabsContent>
          </div>
        </section>
      </Tabs>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 bg-gradient-to-b from-background to-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-sm text-muted-foreground">
              <p>
                Built on{" "}
                <a
                  href="https://arc.network"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline transition-colors"
                >
                  Arc Network
                </a>{" "}
                • Testnet
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Connect with Arc:</span>
              <div className="flex gap-3">
                <a
                  href="https://x.com/arc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1DA1F2] to-[#0d8bd9] hover:from-[#0d8bd9] hover:to-[#1DA1F2] flex items-center justify-center transition-all group shadow-lg hover:shadow-xl"
                  aria-label="X (Twitter)"
                >
                  <Twitter className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://discord.gg/arc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#5865F2] to-[#4752C4] hover:from-[#4752C4] hover:to-[#5865F2] flex items-center justify-center transition-all group shadow-lg hover:shadow-xl"
                  aria-label="Discord"
                >
                  <MessageCircle className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://www.arc.network"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 hover:from-primary/80 hover:to-primary flex items-center justify-center transition-all group shadow-lg hover:shadow-xl"
                  aria-label="Arc Network Website"
                >
                  <Globe className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  )
}
