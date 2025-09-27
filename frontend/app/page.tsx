"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: 0.05 * i, duration: 0.5, ease: "easeOut" } }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: (i = 0) => ({ opacity: 1, scale: 1, transition: { delay: 0.06 * i, duration: 0.45, ease: "easeOut" } }),
};

export default function Page() {
  return (
    <main className="relative min-h-screen bg-neutral-950 text-neutral-100">
      {/* Background grid + glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Subtle radial glows */}
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-[-16rem] right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-cyan-400/10 blur-3xl" />
        {/* Animated grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:22px_22px] animate-[gridmove_18s_linear_infinite]" />
        <style>{`
          @keyframes gridmove { from { background-position: 0px 0px; } to { background-position: 44px 22px; } }
        `}</style>
      </div>

      <Navbar />
      <Hero />
      <PartnerStrip />
      <HowItWorks />
      <DealTimeline />
      <Integrations />
      <Proof />
      <CTA />
      <Footer />
    </main>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="group inline-flex items-center gap-2">
          <Logo className="h-6 w-6" />
          <span className="text-lg font-semibold tracking-tight text-neutral-50">Mintaro</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#how" className="text-sm text-neutral-300 hover:text-neutral-50">How it works</a>
          <a href="#integrations" className="text-sm text-neutral-300 hover:text-neutral-50">Integrations</a>
          <a href="#proof" className="text-sm text-neutral-300 hover:text-neutral-50">Proof</a>
          <a href="#cta" className="text-sm text-neutral-300 hover:text-neutral-50">Get started</a>
          <a href="/app" className="rounded-xl bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-white">Launch App</a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative isolate mx-auto max-w-7xl px-4 pb-8 pt-16">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <motion.h1 variants={fadeUp as any} custom={0} className="text-balance text-4xl font-bold leading-tight text-neutral-50 md:text-5xl">
            Trustless work. Global talent. <span className="text-emerald-400">On‑chain</span> outcomes.
          </motion.h1>
          <motion.p variants={fadeUp as any} custom={1} className="mt-4 max-w-xl text-pretty text-neutral-300">
            Mintaro is a freelance platform where budgets live in Polygon escrow, deliverables are pinned on Filecoin, and every milestone is indexed by The Graph. No handshakes — just verifiable work.
          </motion.p>
          <motion.div variants={fadeUp as any} custom={2} className="mt-8 flex flex-wrap gap-3">
            <a href="/app" className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-400">Launch live demo</a>
            <a href="https://github.com/mintaroxyz/contracts" target="_blank" className="rounded-xl border border-neutral-700 px-5 py-3 text-sm font-semibold text-neutral-200 hover:border-neutral-500">View smart contracts</a>
          </motion.div>
          <motion.div variants={fadeUp as any} custom={3} className="mt-6 flex items-center gap-4 text-xs text-neutral-400">
            <span className="inline-flex items-center gap-2"><ShieldIcon className="h-4 w-4"/> Escrowed on Polygon</span>
            <span className="inline-flex items-center gap-2"><PinIcon className="h-4 w-4"/> Deliverables on Filecoin</span>
            <span className="inline-flex items-center gap-2"><GraphIcon className="h-4 w-4"/> Indexed by The Graph</span>
          </motion.div>
        </div>
        {/* Right visual */}
        <motion.div variants={scaleIn as any} custom={1} className="relative">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-4 shadow-2xl">
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
                <span>Milestone #2 released via x402</span>
                <span className="ml-auto">Tx • 0x8d…21f</span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded bg-neutral-800">
                <div className="h-full w-2/3 animate-[progress_3s_ease-out_infinite] bg-emerald-500" />
              </div>
              <style>{`@keyframes progress {0%{width:14%} 60%{width:72%} 100%{width:14%}}`}</style>
              <div className="mt-4 grid gap-3 text-sm">
                <KV k="Budget" v="2,000 USDC (escrow)" />
                <KV k="Freelancer" v="0xF1…9cA" />
                <KV k="Arbiter" v="Safe multisig (optional)" />
                <KV k="Deliverable CID" v="bafybeigd…" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function PartnerStrip() {
  const partners = [
    { name: "Polygon (x402)", icon: <PolygonIcon className="h-5 w-5" /> },
    { name: "Filecoin", icon: <FilecoinIcon className="h-5 w-5" /> },
    { name: "The Graph", icon: <GraphIcon className="h-5 w-5" /> },
  ];
  return (
    <div className="border-y border-neutral-900 bg-neutral-950/60">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-4 py-4 text-sm text-neutral-400">
        {partners.map((p, i) => (
          <motion.div key={p.name} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 * i }} className="inline-flex items-center gap-2">
            {p.icon}
            <span>{p.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { title: "Create deal", desc: "Client defines scope, milestones, and lock-in USDC on Polygon.", icon: <ScopeIcon className="h-5 w-5" /> },
    { title: "Ship deliverables", desc: "Freelancer uploads artifacts pinned to Filecoin with CIDs.", icon: <UploadIcon className="h-5 w-5" /> },
    { title: "Verify & release", desc: "Client approves; x402 agent releases milestone payout automatically.", icon: <LightningIcon className="h-5 w-5" /> },
    { title: "Index & reputation", desc: "All events indexed by The Graph powering public reputation.", icon: <StarIcon className="h-5 w-5" /> },
  ];
  return (
    <section id="how" className="mx-auto max-w-7xl px-4 py-16">
      <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp as any} className="text-2xl font-semibold text-neutral-50">
        How Mintaro works
      </motion.h2>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {steps.map((s, i) => (
          <motion.div key={s.title} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} variants={scaleIn as any} className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
            <div className="flex items-center gap-2 text-emerald-400">{s.icon}<span className="text-xs uppercase tracking-wide">Step {i + 1}</span></div>
            <h3 className="mt-2 text-base font-semibold text-neutral-100">{s.title}</h3>
            <p className="mt-1 text-sm text-neutral-300">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function DealTimeline() {
  const events = [
    { t: "T0", label: "Escrow funded", detail: "USDC locked on Polygon" },
    { t: "T1", label: "Milestone #1", detail: "CID posted on Filecoin" },
    { t: "T2", label: "x402 release", detail: "Auto payout" },
    { t: "T3", label: "Indexed", detail: "The Graph subgraph" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-neutral-100">Deal lifecycle</h3>
          <span className="text-xs text-neutral-400">event‑driven • on‑chain</span>
        </div>
        <div className="relative mt-4">
          <div className="h-1 w-full rounded bg-neutral-800" />
          <motion.div initial={{ width: "0%" }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }} className="-mt-1 h-1 rounded bg-emerald-500" />
          <div className="mt-6 grid grid-cols-4">
            {events.map((e, i) => (
              <motion.div key={e.t} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 * i }} className="text-sm">
                <div className="mb-2 inline-flex items-center gap-2 text-emerald-400"><DotIcon className="h-5 w-5" /> {e.label}</div>
                <div className="text-neutral-300">{e.detail}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Integrations() {
  const cards = [
    {
      name: "Polygon x402 — Agentic Payouts",
      bullets: [
        "x402 agent releases milestone funds when on-chain conditions pass",
        "Supports auto-dispute pause and multisig arbiter overrides",
        "USDC/USDT on Polygon PoS"
      ],
    },
    {
      name: "Filecoin — Verifiable Deliverables",
      bullets: [
        "Artifacts pinned with Content IDs (CID)",
        "CID immutability referenced in EscrowContract",
        "Optional redundancy via IPFS gateways",
      ],
    },
    {
      name: "The Graph — Search & Reputation",
      bullets: [
        "Subgraph indexes DealCreated, MilestoneReleased, DisputeOpened",
        "Profiles aggregate completed work and on-chain feedback",
        "UI queries subgraph for deal history & stats",
      ],
    },
  ];
  return (
    <section id="integrations" className="mx-auto max-w-7xl px-4 py-16">
      <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp as any} className="text-2xl font-semibold text-neutral-50">
        Batteries included — built for web3 work
      </motion.h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {cards.map((c, i) => (
          <motion.div key={c.name} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} variants={scaleIn as any} className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
            <h3 className="text-base font-semibold text-neutral-100">{c.name}</h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-300">
              {c.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2"><CheckIcon className="mt-0.5 h-4 w-4 flex-none" /> <span>{b}</span></li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Proof() {
  const stats = [
    { k: "Active escrows", v: "18" },
    { k: "Total volume", v: "$42.8k" },
    { k: "Avg. release time", v: "28h" },
    { k: "On‑chain disputes", v: "1.2%" },
  ];
  return (
    <section id="proof" className="mx-auto max-w-7xl px-4 py-12">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-neutral-100">Transparency by default</h3>
          <span className="text-xs text-neutral-400">mock data • wire to subgraph</span>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div key={s.k} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 * i }} className="rounded-xl border border-neutral-800 bg-neutral-950/40 p-4">
              <div className="text-xs text-neutral-400">{s.k}</div>
              <div className="mt-1 text-2xl font-semibold text-neutral-50">{s.v}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="mx-auto max-w-7xl px-4 py-16">
      <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-8">
        <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h3 className="text-2xl font-semibold text-neutral-50">Open, global, and provable work.</h3>
          <p className="mt-2 max-w-2xl text-neutral-300">Spin up a deal in minutes. Pay only when milestones ship. Everything is auditable on-chain.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/app" className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-400">Create your first deal</a>
            <a href="https://thegraph.com" target="_blank" className="rounded-xl border border-neutral-700 px-5 py-3 text-sm font-semibold text-neutral-200 hover:border-neutral-500">Explore subgraph</a>
          </div>
        </motion.div>
        <div className="pointer-events-none absolute -right-10 -top-10 h-60 w-60 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-neutral-900 bg-neutral-950/80">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-neutral-400">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="inline-flex items-center gap-2"><Logo className="h-5 w-5" /><span>Mintaro</span></div>
          <div className="flex flex-wrap gap-4">
            <a className="hover:text-neutral-200" href="/docs">Docs</a>
            <a className="hover:text-neutral-200" href="/privacy">Privacy</a>
            <a className="hover:text-neutral-200" href="/terms">Terms</a>
            <a className="hover:text-neutral-200" href="https://x.com/mintaro_xyz" target="_blank">X</a>
            <a className="hover:text-neutral-200" href="https://github.com/hilmikt/mintaro" target="_blank">GitHub</a>
          </div>
        </div>
        <div className="mt-6 text-xs">© {new Date().getFullYear()} Mintaro. All rights reserved.</div>
      </div>
    </footer>
  );
}

// ------------------------------
// Small building blocks
// ------------------------------
function KV({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-neutral-400">{k}</span>
      <span className="text-sm font-medium text-neutral-100">{v}</span>
    </div>
  );
}

function Logo({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <defs>
        <linearGradient id="mint" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="28" height="28" rx="7" fill="url(#mint)" opacity="0.18" />
      <path d="M8 20.5V11.5a2 2 0 0 1 2-2h2.2a2 2 0 0 1 1.6.8l1.6 2.1a2 2 0 0 0 1.6.8H22a2 2 0 0 1 2 2v5.3a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2Z" fill="url(#mint)" />
    </svg>
  );
}

function CheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
function ShieldIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4Z" />
    </svg>
  );
}
function PinIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v6m0 8v6m6-10H6" />
    </svg>
  );
}
function GraphIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M8.5 15.5 15.5 8.5" />
    </svg>
  );
}
function PolygonIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 7h6l4 4-4 6H7l-4-6 4-4Z" />
    </svg>
  );
}
function FilecoinIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12h6m-3-6v12" />
    </svg>
  );
}
function LightningIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
    </svg>
  );
}
function ScopeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v6m0 6v6M3 12h6m6 0h6" />
    </svg>
  );
}
function UploadIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 16V7m0 0 4 4m-4-4-4 4M4 20h16" />
    </svg>
  );
}
function StarIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m12 3 3.1 6.3 6.9 1-5 4.8 1.2 6.9L12 19l-6.2 3 1.2-6.9-5-4.8 6.9-1L12 3Z" />
    </svg>
  );
}
function DotIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}
