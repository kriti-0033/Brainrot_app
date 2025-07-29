import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import Timer from "./Timer";
import QuestionCard from "./QuestionCard";
import QuestionNavigation from "./QuestionNavigation";
import { quizQuestions } from "@/data/quizData";

interface QuizPageProps {
  userEmail: string;
  onComplete: (results: QuizResults) => void;
}

export interface QuizResults {
  userEmail: string;
  answers: Record<string, string>;
  completedAt: Date;
  timeSpent: number;
}

const QUIZ_DURATION = 30 * 60; // 30 minutes in seconds

const QuizPage = ({ userEmail, onComplete }: QuizPageProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>(new Set([1]));
  const [startTime] = useState(Date.now());
  const { toast } = useToast();

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const currentQuestionNumber = currentQuestionIndex + 1;
  const answeredQuestions = new Set(
    Object.keys(answers).map(id => quizQuestions.findIndex(q => q.id === id) + 1).filter(idx => idx > 0)
  );

  useEffect(() => {
    setVisitedQuestions(prev => new Set(prev).add(currentQuestionNumber));
  }, [currentQuestionNumber]);

  const handleAnswerSelect = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleQuestionSelect = (questionNumber: number) => {
    setCurrentQuestionIndex(questionNumber - 1);
  };

  const handleSubmit = () => {
    const unansweredCount = quizQuestions.length - Object.keys(answers).length;
    
    if (unansweredCount > 0) {
      toast({
        title: "Incomplete Quiz",
        description: `You have ${unansweredCount} unanswered questions. Are you sure you want to submit?`,
        action: (
          <Button 
            size="sm" 
            onClick={completeQuiz}
            variant="destructive"
          >
            Submit Anyway
          </Button>
        ),
      });
      return;
    }
    
    completeQuiz();
  };

  const completeQuiz = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const results: QuizResults = {
      userEmail,
      answers,
      completedAt: new Date(),
      timeSpent
    };
    onComplete(results);
  };

  const handleTimeUp = () => {
    toast({
      title: "Time's Up!",
      description: "The quiz has been automatically submitted.",
      variant: "destructive",
    });
    completeQuiz();
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 p-4 bg-card rounded-lg shadow-sm">
          <div>
            <h1 className="text-2xl font-bold">Quiz Challenge</h1>
            <p className="text-muted-foreground">{userEmail}</p>
          </div>
          <Timer duration={QUIZ_DURATION} onTimeUp={handleTimeUp} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Navigation Sidebar */}
          <div className="lg:col-span-1">
            <QuestionNavigation
              totalQuestions={quizQuestions.length}
              currentQuestion={currentQuestionNumber}
              visitedQuestions={visitedQuestions}
              answeredQuestions={answeredQuestions}
              onQuestionSelect={handleQuestionSelect}
            />
          </div>

          {/* Main Question Area */}
          <div className="lg:col-span-3 space-y-6">
            <QuestionCard
              question={currentQuestion}
              questionNumber={currentQuestionNumber}
              totalQuestions={quizQuestions.length}
              selectedAnswer={answers[currentQuestion.id] || null}
              onAnswerSelect={handleAnswerSelect}
            />

            {/* Navigation Controls */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <div className="flex gap-3">
                {currentQuestionIndex === quizQuestions.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    variant="hero"
                    size="lg"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Quiz
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={currentQuestionIndex === quizQuestions.length - 1}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;