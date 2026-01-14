import Link from 'next/link';
import { getAllModules, getStandaloneLessons } from '@/lib/markdown';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, Workflow, Brain, Clock, ChevronRight, Sparkles, Layers, ShieldCheck, Zap, Layout } from 'lucide-react';
import * as React from 'react';

const iconMap: Record<string, React.ReactNode> = {
  Workflow: <Workflow className="h-6 w-6" />,
  FileText: <FileText className="h-6 w-6" />,
  Brain: <Brain className="h-6 w-6" />,
  BookOpen: <BookOpen className="h-6 w-6" />,
};

export default async function HomePage() {
  const modules = await getAllModules();
  const standaloneLessons = await getStandaloneLessons();

  const allItems = [
    ...modules.map(m => ({ ...m, type: 'module' as const })),
    ...standaloneLessons.map(l => ({ 
      ...l, 
      type: 'standalone' as const, 
      description: `Deep dive into ${l.title}. Estimated ${l.estimatedTime}m read.`,
      icon: 'Brain'
    }))
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-primary/30">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] opacity-30" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <Badge variant="outline" className="mb-8 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-black border-primary/30 bg-primary/5 text-primary-foreground/80">
              <Sparkles className="h-3 w-3 mr-2 text-primary" />
              The Elite Product Operating Model
            </Badge>

            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
              Product <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-blue-400">
                Playbook
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground/80 mb-12 max-w-2xl leading-relaxed font-medium">
              A high-vibe, interactive framework for modern Product Managers to master the end-to-end lifecycle from Discovery to Sunset.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href={`/module/${modules[0]?.slug}`}>
                <Button size="lg" className="rounded-full px-8 py-7 text-lg font-bold shadow-[0_0_30px_rgba(var(--primary),0.3)] transition-all hover:scale-105 active:scale-95">
                  Begin Journey
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <div className="flex items-center gap-3 px-6 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#050505] bg-muted/50 flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-primary/40 to-muted animate-pulse" />
                    </div>
                  ))}
                </div>
                <span className="text-sm font-semibold text-muted-foreground">
                  Joined by 500+ PMs
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Core Pillars</h2>
            <p className="text-lg text-muted-foreground/60 font-medium">
              Battle-tested modules designed for speed, rigor, and strategic alignment.
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-white/5 border-white/10 text-white/40 px-3 py-1">4 Modules</Badge>
            <Badge variant="secondary" className="bg-white/5 border-white/10 text-white/40 px-3 py-1">2 Special Guides</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allItems.map((item, index) => (
            <Link 
              key={item.slug} 
              href={item.type === 'module' ? `/module/${item.slug}` : `/lesson/${item.slug}`}
              className="group"
            >
              <div className="relative h-full p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-md transition-all duration-500 hover:bg-white/[0.07] hover:border-primary/30 hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] flex flex-col">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Layers className="w-24 h-24 rotate-[-15deg] translate-x-4 -translate-y-4" />
                </div>

                <div className="mb-8">
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform duration-500 border border-primary/20">
                    {iconMap[item.icon] || <Brain className="h-7 w-7" />}
                  </div>
                  {item.type === 'standalone' && (
                    <Badge className="ml-4 bg-primary/20 text-primary border-none text-[10px] uppercase font-black py-1">Guide</Badge>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-black mb-3 tracking-tight group-hover:text-primary transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground/60 text-sm leading-relaxed font-medium line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest font-black text-white/20 group-hover:text-primary/60 transition-colors">
                    {item.type === 'module' ? `${(item as any).lessons?.length || 0} Chapters` : 'Special Edition'}
                  </span>
                  <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust & Features Section */}
      <section className="py-24 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-400">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-3">Outcome Driven</h4>
              <p className="text-muted-foreground/60 text-sm leading-relaxed">Transition from feature-factories to value-based engineering leadership.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 text-purple-400">
                <Zap className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-3">Immersive Visuals</h4>
              <p className="text-muted-foreground/60 text-sm leading-relaxed">60fps transitions and interactive PDLC maps for maximum cognitive retention.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-400">
                <Layout className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-3">Multi-Mode Learning</h4>
              <p className="text-muted-foreground/60 text-sm leading-relaxed">Switch between Presentation, Learning, and Quiz modes on the fly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-primary rounded shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
            <span className="font-black tracking-tighter text-lg uppercase">Product Playbook</span>
          </div>
          <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-muted-foreground/40">
            <span>By Cylentro</span>
            <span>© 2024</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-emerald-500/60">Systems Nominal</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
