'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RotateCcw, Trophy, ChevronRight } from 'lucide-react';
import type { QuizQuestion } from '@/lib/types';

interface QuizEngineProps {
    questions: QuizQuestion[];
    lessonTitle: string;
}

export function QuizEngine({ questions, lessonTitle }: QuizEngineProps) {
    const { quizState, submitAnswer, submitQuiz, resetQuiz } = useAppStore();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    // Shuffle questions on mount (for randomization)
    const [shuffledQuestions] = useState(() =>
        [...questions].sort(() => Math.random() - 0.5)
    );

    const handleOptionSelect = (optionIndex: number) => {
        if (showFeedback) return;
        setSelectedAnswer(optionIndex);
    };

    const handleSubmitAnswer = () => {
        if (selectedAnswer === null) return;

        const question = shuffledQuestions[currentQuestion];
        submitAnswer(question.id, selectedAnswer);
        setShowFeedback(true);
    };

    const handleNextQuestion = () => {
        setShowFeedback(false);
        setSelectedAnswer(null);

        if (currentQuestion < shuffledQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Calculate final score
            const correctAnswers = shuffledQuestions.filter(
                (q) => quizState.answers[q.id] === q.correctIndex
            ).length;
            submitQuiz(correctAnswers, shuffledQuestions.length);
        }
    };

    const handleRestart = () => {
        resetQuiz();
        setCurrentQuestion(0);
        setShowFeedback(false);
        setSelectedAnswer(null);
    };

    const progress = ((currentQuestion + (showFeedback ? 1 : 0)) / shuffledQuestions.length) * 100;
    const question = shuffledQuestions[currentQuestion];
    const isCorrect = selectedAnswer === question?.correctIndex;

    if (quizState.submitted) {
        return <QuizResults score={quizState.score} total={quizState.totalQuestions} onRestart={handleRestart} />;
    }

    if (!question) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Card className="w-full max-w-lg">
                    <CardContent className="p-8 text-center">
                        <p className="text-muted-foreground">No quiz questions available for this lesson.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="w-full max-w-3xl mx-auto px-4 py-8">
            {/* Progress */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                        Question {currentQuestion + 1} of {shuffledQuestions.length}
                    </span>
                    <Badge variant="outline">{lessonTitle}</Badge>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card className="border-2 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl leading-relaxed">
                                {question.question}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {question.options.map((option, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => handleOptionSelect(index)}
                                    disabled={showFeedback}
                                    className={cn(
                                        'w-full text-left p-4 rounded-xl border-2 transition-all',
                                        'hover:border-primary/50 hover:bg-accent/50',
                                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                                        selectedAnswer === index && !showFeedback && 'border-primary bg-primary/10',
                                        showFeedback && index === question.correctIndex && 'border-green-500 bg-green-500/10',
                                        showFeedback && selectedAnswer === index && !isCorrect && 'border-red-500 bg-red-500/10',
                                        showFeedback && selectedAnswer !== index && 'opacity-50'
                                    )}
                                    whileHover={{ scale: showFeedback ? 1 : 1.01 }}
                                    whileTap={{ scale: showFeedback ? 1 : 0.99 }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={cn(
                                                'flex h-8 w-8 items-center justify-center rounded-full border-2 font-medium text-sm',
                                                selectedAnswer === index && !showFeedback && 'border-primary bg-primary text-primary-foreground',
                                                showFeedback && index === question.correctIndex && 'border-green-500 bg-green-500 text-white',
                                                showFeedback && selectedAnswer === index && !isCorrect && 'border-red-500 bg-red-500 text-white'
                                            )}
                                        >
                                            {showFeedback && index === question.correctIndex ? (
                                                <CheckCircle className="h-5 w-5" />
                                            ) : showFeedback && selectedAnswer === index && !isCorrect ? (
                                                <XCircle className="h-5 w-5" />
                                            ) : (
                                                String.fromCharCode(65 + index)
                                            )}
                                        </div>
                                        <span className="flex-1">{option}</span>
                                    </div>
                                </motion.button>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>
            </AnimatePresence>

            {/* Feedback */}
            <AnimatePresence>
                {showFeedback && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-6"
                    >
                        <Card className={cn(
                            'border-2',
                            isCorrect ? 'border-green-500/50 bg-green-500/5' : 'border-orange-500/50 bg-orange-500/5'
                        )}>
                            <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                    {isCorrect ? (
                                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                                    ) : (
                                        <XCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                                    )}
                                    <div>
                                        <p className="font-medium">
                                            {isCorrect ? 'Correct!' : 'Not quite right'}
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {question.explanation}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6">
                {!showFeedback ? (
                    <Button
                        onClick={handleSubmitAnswer}
                        disabled={selectedAnswer === null}
                        size="lg"
                        className="min-w-[140px]"
                    >
                        Check Answer
                    </Button>
                ) : (
                    <Button
                        onClick={handleNextQuestion}
                        size="lg"
                        className="min-w-[140px] gap-2"
                    >
                        {currentQuestion < shuffledQuestions.length - 1 ? (
                            <>
                                Next Question
                                <ChevronRight className="h-4 w-4" />
                            </>
                        ) : (
                            'See Results'
                        )}
                    </Button>
                )}
            </div>
        </div>
    );
}

function QuizResults({
    score,
    total,
    onRestart
}: {
    score: number;
    total: number;
    onRestart: () => void;
}) {
    const percentage = Math.round((score / total) * 100);
    const isPassing = percentage >= 70;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg mx-auto px-4 py-8"
        >
            <Card className="border-2 shadow-xl overflow-hidden">
                <div className={cn(
                    'p-8 text-center',
                    isPassing
                        ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10'
                        : 'bg-gradient-to-br from-orange-500/10 to-amber-500/10'
                )}>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                    >
                        <Trophy className={cn(
                            'h-16 w-16 mx-auto mb-4',
                            isPassing ? 'text-green-500' : 'text-orange-500'
                        )} />
                    </motion.div>

                    <h2 className="text-2xl font-bold mb-2">
                        {isPassing ? 'Congratulations!' : 'Keep Learning!'}
                    </h2>

                    <p className="text-muted-foreground">
                        {isPassing
                            ? 'You have demonstrated solid understanding of this material.'
                            : 'Review the content and try again to improve your score.'
                        }
                    </p>
                </div>

                <CardContent className="p-8">
                    <div className="text-center mb-6">
                        <div className="text-5xl font-bold mb-2">
                            {score}/{total}
                        </div>
                        <Badge
                            variant={isPassing ? 'default' : 'secondary'}
                            className="text-lg px-4 py-1"
                        >
                            {percentage}%
                        </Badge>
                    </div>

                    <div className="space-y-3">
                        <Button
                            onClick={onRestart}
                            variant="outline"
                            className="w-full gap-2"
                        >
                            <RotateCcw className="h-4 w-4" />
                            Try Again
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
