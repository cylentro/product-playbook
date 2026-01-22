import Link from 'next/link';
import { getAllModules, getStandaloneLessons } from '@/lib/markdown';
import { Badge } from '@/components/ui/badge';
import { BookOpen, FileText, Workflow, Brain, ChevronRight, ShieldCheck, Zap, Layout } from 'lucide-react';
import { InteractiveHero, ScrollReveal, StaggerContainer, StaggerItem, HomeKeyboardNav } from '@/components/modules';
import DecryptedText from '@/components/ui/decrypted-text';

const iconMap: Record<string, React.ReactNode> = {
  Workflow: <Workflow className="h-6 w-6" />,
  FileText: <FileText className="h-6 w-6" />,
  Brain: <Brain className="h-6 w-6" />,
  BookOpen: <BookOpen className="h-6 w-6" />,
};

export default async function HomePage() {
  const modules = await getAllModules();
  const standaloneLessons = await getStandaloneLessons();

  return (
    <main 
      id="home-main"
      data-lenis-prevent 
      className="h-screen w-full overflow-y-scroll md:snap-y md:snap-mandatory scroll-smooth bg-background text-foreground selection:bg-primary/10"
    >
      <HomeKeyboardNav />
      
      {/* 1. HERO SECTION */}
      <div className="md:snap-start min-h-screen w-full shrink-0 flex flex-col">
        <InteractiveHero />
      </div>

      {/* 2. CORE PILLARS SECTION */}
      <section id="core-pillars" className="md:snap-start min-h-screen w-full shrink-0 flex items-center justify-center relative overflow-hidden md:overflow-visible bg-gradient-to-b from-background via-violet-500/5 to-fuchsia-500/10 py-24 md:py-0">
        {/* Subtle accent orbs for depth */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-fuchsia-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl w-full mx-auto px-6 relative z-10">
          <ScrollReveal animation="slideUp" once={false}>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <Badge variant="secondary" className="mb-4 bg-primary/5 border-primary/10 text-primary px-3 py-1">CURRICULUM</Badge>
                <h2 className="text-3xl md:text-6xl font-black tracking-tight mb-4 text-foreground">Core Pillars</h2>
                <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">
                  The foundational modules of the Product Operating Model.
                </p>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <span className="text-4xl font-black text-primary/20 group-hover:text-primary/40 transition-colors uppercase tracking-tighter">{modules.length}</span>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none">Modules<br/>Available</span>
              </div>
            </div>
          </ScrollReveal>
  
          <StaggerContainer delay={0.2} once={false}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {modules.map((item) => (
                <StaggerItem key={item.slug}>
                  <Link 
                    href={`/module/${item.slug}`}
                    className="group block h-full"
                  >
                    <div className="relative h-full p-6 md:p-8 rounded-[2rem] bg-card/50 backdrop-blur-sm border border-border/40 transition-all duration-500 hover:border-primary/40 hover:shadow-[0_20px_50px_-12px_rgba(var(--primary-rgb),0.15)] hover:scale-[1.02] flex flex-col md:flex-row gap-6">
                      <div className="shrink-0">
                        <div className="inline-flex items-center justify-center h-14 w-14 rounded-[1rem] bg-primary/5 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 border border-primary/10 group-hover:shadow-lg group-hover:shadow-primary/30">
                          <Brain className="h-7 w-7" />
                        </div>
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-primary transition-colors leading-tight text-foreground mb-2">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed font-medium line-clamp-2 mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                          {item.description}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground/40 group-hover:text-primary transition-colors">
                            {item.lessons?.length || 0} CHAPTERS
                          </span>
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary transition-all duration-500 group-hover:translate-x-2">
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>
  
      {/* 3. EXPERT GUIDES SECTION */}
      <section className="md:snap-start min-h-screen w-full shrink-0 flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-fuchsia-500/10 via-violet-500/5 to-background py-24 md:py-0">
        {/* Connecting glows */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-fuchsia-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl w-full mx-auto px-6 relative z-10">
          <ScrollReveal animation="scaleUp" once={false}>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <Badge variant="secondary" className="mb-4 bg-purple-500/5 border-purple-500/10 text-purple-600 dark:text-purple-400 px-3 py-1">RESOURCES</Badge>
                <h2 className="text-3xl md:text-6xl font-black tracking-tight mb-4 text-foreground">Expert Guides</h2>
                <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">
                  Deep-dive resources to master specific disciplines.
                </p>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <span className="text-4xl font-black text-purple-500/20 group-hover:text-purple-500/40 transition-colors uppercase tracking-tighter">{standaloneLessons.length}</span>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none text-right">Premium<br/>Guides</span>
              </div>
            </div>
          </ScrollReveal>
    
          <StaggerContainer delay={0.2} once={false}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {standaloneLessons.map((item) => (
                <StaggerItem key={item.slug}>
                  <Link 
                    href={`/lesson/${item.slug}`}
                    className="group block h-full"
                  >
                    <div className="relative h-full p-6 md:p-8 rounded-[2rem] bg-card/50 backdrop-blur-sm border border-border/40 transition-all duration-500 hover:border-purple-500/40 hover:shadow-[0_20px_50px_-12px_rgba(168,85,247,0.15)] hover:scale-[1.02] flex flex-col md:flex-row gap-6 overflow-hidden">
                      <div className="shrink-0">
                        <div className="inline-flex items-center justify-center h-14 w-14 rounded-[1rem] bg-purple-500/5 text-purple-500 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all duration-500 border border-purple-500/10 group-hover:shadow-lg group-hover:shadow-purple-500/30">
                          <Brain className="h-7 w-7" />
                        </div>
                      </div>
                      <div className="flex flex-col flex-1 min-w-0 z-10">
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-purple-500 transition-colors leading-tight text-foreground mb-2">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed font-medium line-clamp-2 mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                          {item.description}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground/40 group-hover:text-purple-500 transition-colors">
                              SPECIAL GUIDE
                            </span>
                            <Badge className="bg-purple-500/10 text-purple-600 border-none text-[8px] h-4 px-1.5 uppercase font-black">REF</Badge>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-purple-500 transition-all duration-500 group-hover:translate-x-2">
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                          </div>
                        </div>
                      </div>
                      {/* Animated Background Gradient */}
                      <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors duration-700" />
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* 4. TRUST & FOOTER SECTION */}
      <section className="md:snap-start min-h-screen w-full shrink-0 flex flex-col relative overflow-hidden bg-background pt-16 pb-0 md:py-0">
        {/* Ambient color at the bottom */}
        <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-t from-primary/10 via-blue-500/5 to-transparent rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        {/* Decorative Rings */}
        <div className="absolute top-20 left-20 w-64 h-64 border border-primary/10 rounded-full pointer-events-none opacity-50" />
        <div className="absolute bottom-20 right-20 w-96 h-96 border border-primary/5 rounded-full pointer-events-none opacity-50" />
        
        <div className="flex-1 flex items-center justify-center relative z-10">
            <div className="max-w-7xl w-full mx-auto px-6">
              <ScrollReveal animation="slideUp" once={false}>
                <div className="text-center mb-12 md:mb-16">
                  <Badge variant="outline" className="mb-6 px-4 py-1 border-primary/20 text-primary uppercase font-black tracking-widest text-[10px]">WHY PRODUCT PLAYBOOK</Badge>
                  <h2 className="text-3xl md:text-6xl font-black tracking-tight mb-6">Designed for Excellence</h2>
                </div>
              </ScrollReveal>

              <StaggerContainer delay={0.2} once={false}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12 md:mb-0">
                  {[
                    {
                      icon: <ShieldCheck className="w-8 h-8" />,
                      title: "Outcome Driven",
                      desc: "Transition from feature-factories.",
                      color: "primary"
                    },
                    {
                      icon: <Zap className="w-8 h-8" />,
                      title: "Immersive Visuals",
                      desc: "60fps transitions and interactive maps.",
                      color: "primary"
                    },
                    {
                      icon: <Layout className="w-8 h-8" />,
                      title: "Multi-Mode Learning",
                      desc: "Presentation, Learning, and Quiz modes.",
                      color: "primary"
                    }
                  ].map((feature, i) => (
                    <StaggerItem key={i}>
                      <div className="flex flex-col items-center text-center group">
                        <div className={`w-16 h-16 rounded-3xl bg-card border border-border/40 flex items-center justify-center mb-6 text-${feature.color === 'primary' ? 'primary' : feature.color + '-600'} shadow-lg shadow-black/5 group-hover:scale-110 group-hover:rounded-[2rem] transition-all duration-500 group-hover:shadow-${feature.color === 'primary' ? 'primary' : feature.color}-500/10`}>
                          {feature.icon}
                        </div>
                        <h4 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed font-medium">{feature.desc}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </div>
              </StaggerContainer>
            </div>
        </div>

        {/* Footer stick to bottom of this section */}
        <footer className="pt-6 pb-2 md:py-12 border-t border-border/40 bg-background/50 backdrop-blur-sm mt-auto">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
              <div className="flex items-center gap-3 md:gap-4 text-foreground group">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-xl shadow-xl shadow-primary/30 flex items-center justify-center text-white font-black text-base md:text-lg group-hover:rotate-12 transition-transform duration-500">P</div>
                <div className="flex flex-col">
                  <span className="font-black tracking-tighter text-lg md:text-xl uppercase leading-none">Product</span>
                  <span className="font-black tracking-tighter text-lg md:text-xl uppercase leading-none text-primary">Playbook</span>
                </div>
              </div>

              <div className="flex flex-col items-center md:items-end gap-2">
                <div className="flex items-center gap-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground text-center md:text-right">
                  <span>© 2026 CHRISTIAN HADIANTO</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}
