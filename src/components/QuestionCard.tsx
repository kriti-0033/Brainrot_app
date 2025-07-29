import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Question, getShuffledOptions } from "@/data/quizData";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
}

const QuestionCard = ({ 
  question, 
  questionNumber, 
  totalQuestions, 
  selectedAnswer, 
  onAnswerSelect 
}: QuestionCardProps) => {
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    setOptions(getShuffledOptions(question));
  }, [question]);

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="outline">
            Question {questionNumber} of {totalQuestions}
          </Badge>
          {question.category && (
            <Badge variant="secondary">{question.category}</Badge>
          )}
        </div>
        <CardTitle className="text-xl">{question.question}</CardTitle>
        {question.difficulty && (
          <CardDescription>
            Difficulty: <span className="capitalize font-medium">{question.difficulty}</span>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground mb-4">Select the correct answer:</p>
        <div className="grid gap-3">
          {options.map((option, index) => (
            <Button
              key={`${question.id}-${index}`}
              variant={selectedAnswer === option ? "default" : "question"}
              className={`p-4 h-auto text-wrap ${
                selectedAnswer === option 
                  ? "ring-2 ring-primary ring-offset-2" 
                  : ""
              }`}
              onClick={() => onAnswerSelect(option)}
            >
              <span className="font-medium mr-3">
                {String.fromCharCode(65 + index)}.
              </span>
              <span className="flex-1 text-left">{option}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;