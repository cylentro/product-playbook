import Link from 'next/link';
import { getAllModules, getStandaloneLessons } from '@/lib/markdown';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, Workflow, Brain, Clock, ChevronRight, Sparkles } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Workflow: <Workflow className="h-6 w-6" />,
  FileText: <FileText className="h-6 w-6" />,
  Brain: <Brain className="h-6 w-6" />,
  BookOpen: <BookOpen className="h-6 w-6" />,
};

export default async function HomePage() {
  const modules = await getAllModules();
  const standaloneLessons = await getStandaloneLessons();

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0) + standaloneLessons.length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Motion-Driven Learning
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                PM-AI Learning Nexus
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
              Master the Product Development Lifecycle through interactive lessons,
              presentations, and AI-augmented learning experiences.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={modules[0] ? `/module/${modules[0].slug}` : '#modules'}>
                <Button size="lg" className="min-w-[200px] gap-2">
                  Start Learning
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="min-w-[200px]">
                <Clock className="h-4 w-4 mr-2" />
                {totalLessons} Lessons Available
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section id="modules" className="max-w-7xl mx-auto px-4 pb-20">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Learning Modules</h2>
          <p className="text-muted-foreground">
            Explore comprehensive modules covering the entire product lifecycle.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module, index) => (
            <Link key={module.slug} href={`/module/${module.slug}`}>
              <Card className="group h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground transition-all duration-300">
                      {iconMap[module.icon] || iconMap.BookOpen}
                    </div>
                    <Badge variant="secondary">
                      {module.lessons.length} lessons
                    </Badge>
                  </div>
                  <CardTitle className="mt-4 text-xl group-hover:text-primary transition-colors">
                    {module.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {module.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore module
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {/* Standalone Lessons (like AI for PM) */}
          {standaloneLessons.map((lesson) => (
            <Link key={lesson.slug} href={`/lesson/${lesson.slug}`}>
              <Card className="group h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-primary/5 to-primary/5">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary">
                      <Brain className="h-6 w-6" />
                    </div>
                    <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
                      Special Guide
                    </Badge>
                  </div>
                  <CardTitle className="mt-4 text-xl group-hover:text-primary transition-colors">
                    {lesson.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {lesson.estimatedTime} min read
                  </p>
                  <div className="mt-4 flex items-center text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Read guide
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center p-6">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                <Workflow className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Presentation Mode</h3>
              <p className="text-sm text-muted-foreground">
                High-impact, slide-based view for focused learning sessions.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                <BookOpen className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Learning Mode</h3>
              <p className="text-sm text-muted-foreground">
                Content-rich reading experience with interactive components.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                <Sparkles className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Quiz Mode</h3>
              <p className="text-sm text-muted-foreground">
                Test your knowledge with randomized assessments and instant feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 PM-AI Learning Nexus. Built for Product Managers.</p>
          <p>PWA Enabled • Offline Ready</p>
        </div>
      </footer>
    </main>
  );
}
