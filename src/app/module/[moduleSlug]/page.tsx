import { notFound } from 'next/navigation';
import { getAllModules, getModuleLessons } from '@/lib/markdown';
import { ModuleView } from './ModuleView';

interface ModulePageProps {
    params: Promise<{ moduleSlug: string }>;
}

export async function generateStaticParams() {
    const modules = await getAllModules();
    return modules.map((module) => ({
        moduleSlug: module.slug,
    }));
}

export default async function ModulePage({ params }: ModulePageProps) {
    const { moduleSlug } = await params;
    const modules = await getAllModules();
    const currentModule = modules.find((m) => m.slug === moduleSlug);

    if (!currentModule) {
        notFound();
    }

    const lessons = await getModuleLessons(moduleSlug);

    return (
        <ModuleView 
            module={currentModule} 
            lessons={lessons} 
            moduleSlug={moduleSlug} 
        />
    );
}
