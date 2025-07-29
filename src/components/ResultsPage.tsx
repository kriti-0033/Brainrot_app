import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, Mail, Trophy } from "lucide-react";
import { QuizResults } from "./QuizPage";
import { quizQuestions } from "@/data/quizData";

interface ResultsPageProps {
  results: QuizResults;
  onRestart: () => void;
}

const ResultsPage = ({ results, onRestart }: ResultsPageProps) => {
  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach(question => {
      if (results.answers[question.id] === question.correct_answer) {
        correct++;
      }
    });
    return correct;
  };

  const score = calculateScore();
  const percentage = Math.round((score / quizQuestions.length) * 100);
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getScoreColor = () => {
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreBadge = () => {
    if (percentage >= 90) return { text: "Excellent!", variant: "default" as const };
    if (percentage >= 80) return { text: "Very Good!", variant: "secondary" as const };
    if (percentage >= 70) return { text: "Good", variant: "secondary" as const };
    if (percentage >= 60) return { text: "Fair", variant: "outline" as const };
    return { text: "Needs Improvement", variant: "destructive" as const };
  };

  const scoreBadge = getScoreBadge();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <Trophy className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
            Quiz Completed!
          </h1>
          <p className="text-xl text-muted-foreground">Here are your results</p>
        </div>

        {/* Score Summary */}
        <Card className="mb-8 animate-scale-in shadow-glow">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Your Score</CardTitle>
            <CardDescription>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Mail className="h-4 w-4" />
                {results.userEmail}
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className={`text-6xl font-bold ${getScoreColor()}`}>
              {score}/{quizQuestions.length}
            </div>
            <div className={`text-2xl font-semibold ${getScoreColor()}`}>
              {percentage}%
            </div>
            <Badge variant={scoreBadge.variant} className="text-lg px-4 py-2">
              {scoreBadge.text}
            </Badge>
            
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Time taken: {formatTime(results.timeSpent)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <div className="space-y-4 mb-8">
          <h2 className="text-2xl font-bold text-center mb-6">Detailed Results</h2>
          {quizQuestions.map((question, index) => {
            const userAnswer = results.answers[question.id];
            const isCorrect = userAnswer === question.correct_answer;
            const wasAnswered = userAnswer !== undefined;

            return (
              <Card key={question.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">Question {index + 1}</Badge>
                        {question.category && (
                          <Badge variant="secondary">{question.category}</Badge>
                        )}
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-success" />
                        ) : (
                          <XCircle className="h-5 w-5 text-destructive" />
                        )}
                      </div>
                      <CardTitle className="text-lg">{question.question}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between p-3 rounded-md bg-success/10 border border-success/20">
                      <span className="font-medium">Correct Answer:</span>
                      <span className="text-success font-semibold">{question.correct_answer}</span>
                    </div>
                    
                    {wasAnswered && (
                      <div className={`flex items-center justify-between p-3 rounded-md ${
                        isCorrect 
                          ? 'bg-success/10 border border-success/20' 
                          : 'bg-destructive/10 border border-destructive/20'
                      }`}>
                        <span className="font-medium">Your Answer:</span>
                        <span className={`font-semibold ${isCorrect ? 'text-success' : 'text-destructive'}`}>
                          {userAnswer}
                        </span>
                      </div>
                    )}
                    
                    {!wasAnswered && (
                      <div className="flex items-center justify-between p-3 rounded-md bg-muted/50 border border-muted">
                        <span className="font-medium">Your Answer:</span>
                        <span className="text-muted-foreground italic">Not answered</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="text-center">
          <Button 
            onClick={onRestart} 
            variant="hero" 
            size="lg"
            className="animate-pulse-glow"
          >
            Take Quiz Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;