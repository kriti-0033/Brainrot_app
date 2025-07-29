import { useState } from "react";
import StartPage from "@/components/StartPage";
import QuizPage, { QuizResults } from "@/components/QuizPage";
import ResultsPage from "@/components/ResultsPage";

type AppState = "start" | "quiz" | "results";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("start");
  const [userEmail, setUserEmail] = useState("");
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);

  const handleStart = (email: string) => {
    setUserEmail(email);
    setAppState("quiz");
  };

  const handleQuizComplete = (results: QuizResults) => {
    setQuizResults(results);
    setAppState("results");
  };

  const handleRestart = () => {
    setAppState("start");
    setUserEmail("");
    setQuizResults(null);
  };

  return (
    <>
      {appState === "start" && <StartPage onStart={handleStart} />}
      {appState === "quiz" && (
        <QuizPage userEmail={userEmail} onComplete={handleQuizComplete} />
      )}
      {appState === "results" && quizResults && (
        <ResultsPage results={quizResults} onRestart={handleRestart} />
      )}
    </>
  );
};

export default Index;
