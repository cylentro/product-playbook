import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LearningMode, QuizState, LessonContent } from '@/lib/types';

interface AppState {
    // Mode
    mode: LearningMode;
    setMode: (mode: LearningMode) => void;

    // Navigation
    currentModule: string | null;
    currentLesson: string | null;
    setCurrentModule: (moduleSlug: string | null) => void;
    setCurrentLesson: (lessonSlug: string | null) => void;
    navigateToLesson: (moduleSlug: string, lessonSlug: string) => void;

    // Presentation Mode
    currentSlide: number;
    totalSlides: number;
    setCurrentSlide: (slide: number) => void;
    setTotalSlides: (total: number) => void;
    nextSlide: () => void;
    prevSlide: () => void;

    // Quiz State
    quizState: QuizState;
    submitAnswer: (questionId: string, answerIndex: number) => void;
    submitQuiz: (correctAnswers: number, total: number) => void;
    resetQuiz: () => void;

    // Lesson Content Cache
    lessonContent: LessonContent | null;
    setLessonContent: (content: LessonContent | null) => void;

    // UI State
    sidebarOpen: boolean;
    presentationFullscreen: boolean;
    setSidebarOpen: (open: boolean) => void;
    setPresentationFullscreen: (fullscreen: boolean) => void;
    toggleSidebar: () => void;
    togglePresentationFullscreen: () => void;
}

const initialQuizState: QuizState = {
    answers: {},
    submitted: false,
    score: 0,
    totalQuestions: 0,
};

export const useAppStore = create<AppState>()(
    persist(
        (set, get) => ({
            // Mode
            mode: 'learning',
            setMode: (mode) => set({ mode }),

            // Navigation
            currentModule: null,
            currentLesson: null,
            setCurrentModule: (moduleSlug) => set({ currentModule: moduleSlug }),
            setCurrentLesson: (lessonSlug) => set({ currentLesson: lessonSlug }),
            navigateToLesson: (moduleSlug, lessonSlug) => set({
                currentModule: moduleSlug,
                currentLesson: lessonSlug,
                currentSlide: 0,
                quizState: initialQuizState,
            }),

            // Presentation Mode
            currentSlide: 0,
            totalSlides: 0,
            setCurrentSlide: (slide) => set({ currentSlide: slide }),
            setTotalSlides: (total) => set({ totalSlides: total }),
            nextSlide: () => {
                const { currentSlide, totalSlides } = get();
                if (currentSlide < totalSlides - 1) {
                    set({ currentSlide: currentSlide + 1 });
                }
            },
            prevSlide: () => {
                const { currentSlide } = get();
                if (currentSlide > 0) {
                    set({ currentSlide: currentSlide - 1 });
                }
            },

            // Quiz State
            quizState: initialQuizState,
            submitAnswer: (questionId, answerIndex) => {
                const { quizState } = get();
                set({
                    quizState: {
                        ...quizState,
                        answers: {
                            ...quizState.answers,
                            [questionId]: answerIndex,
                        },
                    },
                });
            },
            submitQuiz: (correctAnswers, total) => {
                set({
                    quizState: {
                        ...get().quizState,
                        submitted: true,
                        score: correctAnswers,
                        totalQuestions: total,
                    },
                });
            },
            resetQuiz: () => set({ quizState: initialQuizState }),

            // Lesson Content Cache
            lessonContent: null,
            setLessonContent: (content) => set({ lessonContent: content }),

            // UI State
            sidebarOpen: true,
            presentationFullscreen: false,
            setSidebarOpen: (open) => set({ sidebarOpen: open }),
            setPresentationFullscreen: (fullscreen) => set({ presentationFullscreen: fullscreen }),
            toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
            togglePresentationFullscreen: () => set((state) => ({ presentationFullscreen: !state.presentationFullscreen })),
        }),
        {
            name: 'pm-playbook-storage',
            partialize: (state) => ({
                mode: state.mode,
                sidebarOpen: state.sidebarOpen,
                presentationFullscreen: state.presentationFullscreen,
            }),
        }
    )
);
