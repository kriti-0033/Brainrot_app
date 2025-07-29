import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, AlertCircle } from "lucide-react";

interface QuestionNavigationProps {
  totalQuestions: number;
  currentQuestion: number;
  visitedQuestions: Set<number>;
  answeredQuestions: Set<number>;
  onQuestionSelect: (questionNumber: number) => void;
}

const QuestionNavigation = ({ 
  totalQuestions, 
  currentQuestion, 
  visitedQuestions, 
  answeredQuestions, 
  onQuestionSelect 
}: QuestionNavigationProps) => {
  const getQuestionStatus = (questionNumber: number) => {
    if (answeredQuestions.has(questionNumber)) {
      return { icon: CheckCircle, color: "bg-success", text: "Answered" };
    }
    if (visitedQuestions.has(questionNumber)) {
      return { icon: AlertCircle, color: "bg-warning", text: "Visited" };
    }
    return { icon: Circle, color: "bg-muted", text: "Not visited" };
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg">Question Overview</CardTitle>
        <CardDescription>Click on any question to navigate</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: totalQuestions }, (_, i) => {
            const questionNumber = i + 1;
            const status = getQuestionStatus(questionNumber);
            const isActive = questionNumber === currentQuestion;
            
            return (
              <Button
                key={questionNumber}
                variant={isActive ? "default" : "quiz"}
                size="sm"
                onClick={() => onQuestionSelect(questionNumber)}
                className={`relative ${isActive ? "ring-2 ring-primary ring-offset-2" : ""}`}
              >
                {questionNumber}
                {answeredQuestions.has(questionNumber) && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full" />
                )}
              </Button>
            );
          })}
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full" />
              <span>Answered</span>
            </div>
            <Badge variant="secondary">{answeredQuestions.size}</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-warning rounded-full" />
              <span>Visited</span>
            </div>
            <Badge variant="secondary">{visitedQuestions.size - answeredQuestions.size}</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-muted rounded-full" />
              <span>Not visited</span>
            </div>
            <Badge variant="secondary">{totalQuestions - visitedQuestions.size}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionNavigation;